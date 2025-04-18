const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const Submission = require("../models/Submission");
const Comment = require("../models/Comment");
const router = express.Router();
const {upload, s3Client} = require("../awsConnect");
const {DeleteObjectCommand}= require("@aws-sdk/client-s3");


// Upload Submission
router.post("/upload", upload.single("document"), async (req, res) => {
  try {
    console.log(req.body);  // To check the other form fields
    console.log(req.file);  // To check the uploaded file
    if (!req.file) {
      return res.status(400).json({ error: "File upload failed!" });
    }

    const {authorID} = req.body;

    // Check if authorID is provided in the cookies
    if (!authorID) {
      return res.status(400).json({ error: "User ID is required in cookies" });
    }

    const { title, firstName, lastName, collaborators, isPoster, isArticle, abstract, tags } = req.body;

    const newSubmission = new Submission({
      authorID,
      title,
      firstName,
      lastName,
      collaborators,
      document: req.file.location, // S3 file URL
      isPoster,
      isArticle,
      abstract,
      tags,
      stage: "1"
    });

    await newSubmission.save();

    res.status(201).json({ message: "File uploaded successfully!", fileUrl: req.file.location });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//all submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find(); // Fetch all submissions from the database
    res.json(submissions); // Send the submissions as a response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Get All posters
router.get("/gallery", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page-1)*limit;
    const query = req.query.q || "";

    const searchFilter = {
      isPoster:true,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
        { collaborators: { $regex: query, $options: "i" } },
      ]
    }
  
    const [posters,total] = await Promise.all([
      Submission.find(searchFilter).skip(skip).limit(limit), //finds posters only
      Submission.countDocuments(searchFilter),
    ])
    const totalPages = Math.ceil(total/limit);
    res.json({
      currentPage: page,
      totalPages,
      totalPosters: total,
      posters
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All articles
router.get("/publications", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 20;
      const skip = (page-1)*limit;
      const query = req.query.q || "";

      const searchFilter = {
        isArticle:true,
        stage: { $nin: ["1","0","2","3"]},
        $or: [
          { title: { $regex: query, $options: "i" } },
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
          { tags: { $regex: query, $options: "i" } },
          { collaborators: { $regex: query, $options: "i" } },
        ]
      }

      const [articles,total] = await Promise.all([
        Submission.find(searchFilter).skip(skip).limit(limit), // finds articles only
        Submission.countDocuments(searchFilter),
      ])
    
      const totalPages = Math.ceil(total/limit);
      res.json({
        currentPage: page,
        totalPages,
        totalPapers: total,
        articles
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
//get all unpublished articles
  router.get("/unpublished", async (req, res) => {
    try {
      const articles = await Submission.find({isArticle:true, stage: { $nin: ["4", "0"] }}); // finds articles that are unpublished
      console.log("Fetched Articles:", articles); // Debugging line
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/unassigned", async (req, res) => {
    try {
      const submissions = await Submission.find({isArticle:true, stage: "1", $or: [{ editorID: null }, { editorID: { $exists: false } }]}); // finds articles that are unassigned
      console.log("Unassigned Submissions:", submissions); // Verify what's being returned
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/archives", async (req, res) => {
    try {
      const submissions = await Submission.find({isArticle:true, stage: ["4", "0"] }); // finds articles that are archived
      console.log("Unassigned Submissions:", submissions); // Verify what's being returned
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// individual submission
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findById(id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all of authors articles
router.get("/authorArt/:authorID", async (req, res) => {
  try {
    const { authorID } = req.params;

    if(!mongoose.Types.ObjectId.isValid(authorID)){
      return res.status(400).json({ message: "Invalid author ID" });
    }

    const submission = await Submission.find({authorID,isArticle:true});

    if (!submission) {
      return res.status(404).json({ message: "No Submissions For This Author" });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//gets author posters
router.get("/authorPos/:authorID", async (req, res) => {
  try {
    const { authorID } = req.params;

    if(!mongoose.Types.ObjectId.isValid(authorID)){
      return res.status(400).json({ message: "Invalid author ID" });
    }

    const submission = await Submission.find({authorID,isPoster:true});

    if (!submission) {
      return res.status(404).json({ message: "No Submissions For This Author" });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign a reviewer to a submission
router.put("/:submissionId/assign-reviewer", async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { reviewerId } = req.body;

    // Validate reviewerId
    if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
      return res.status(400).json({ error: "Invalid reviewer ID" });
    }

    // Find the submission and update the reviewerID field
    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    if (submission.reviewerID1?.toString() === reviewerId || submission.reviewerID2?.toString() === reviewerId) {
      return res.status(400).json({ error: "Reviewer is already assigned to this submission" });
    }

    // Check available reviewer slots
    if (!submission.reviewerID1) {
      submission.reviewerID1 = reviewerId;
    } else if (!submission.reviewerID2) {
      submission.reviewerID2 = reviewerId;
    } else {
      return res.status(400).json({ error: "Both reviewer slots are full" });
    }

    await submission.save();

    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//my Queue 
router.get("/myQueue/:editorID",async (req,res)=>{
  try{
    const {editorID} = req.params;
    if(!mongoose.Types.ObjectId.isValid(editorID)){
      return res.status(400).json({ message: "Invalid editor ID" });
    }

    const submission = await Submission.find({editorID, isArticle:true, stage: { $nin: ["4","0"] }});

    if (!submission) {
      return res.status(404).json({ message: "No Submissions Assigned To This Editor" });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

//reupload
router.put("/:id/resubmit", upload.single("document"), async (req, res) => {
  try {
    const { id } = req.params;
    const newDocument = req.file; // New file

    if (!newDocument) {
      return res.status(400).json({ error: "File upload failed!" });
    }

    // Find the existing submission
    const submission = await Submission.findById(id);

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    // Check if the submission already has a document (previous file)
    if (submission.document) {
      const oldFileName = submission.document.split("/").pop(); // Extract file name from URL

      // Delete the old file from S3
      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${oldFileName}`,
      };

      // Delete the old file from S3
      await s3Client.send(new DeleteObjectCommand(deleteParams));
      console.log(`Deleted old file: ${oldFileName}`);
    }

    // Update the submission document URL in the database
    submission.document = newDocument.location; // Update with the new file URL
    submission.resubmitted = true;

    // Save the updated submission
    await submission.save();

    res.status(200).json({
      message: "File resubmitted successfully!",
      fileUrl: newDocument.location,
    });
  } catch (error) {
    console.error("Error during resubmission:", error);
    res.status(500).json({ error: error.message });
  }
});

//get all reviewer assignments
router.get("/reviewerSubs/:reviewerID", async (req, res) => {
  try {
    const {reviewerID} = req.params; 

    if (!mongoose.Types.ObjectId.isValid(reviewerID)) {
      return res.status(400).json({ error: "Invalid reviewer ID format" });
    }

    const submissions = await Submission.find({
      $and: [
        { 
          $or: [
            { reviewerID1: reviewerID },
            { reviewerID2: reviewerID }
          ] 
        },
        { stage: "2" }  // Only submissions in stage 2
      ]
    });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign an editor to a submission
router.post("/:submissionId/assign-editor", async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { editorId } = req.body;

    // Validate editor exists and is an editor
    const editor = await User.findById(editorId);
    if (!editor || !editor.isEditor) {
      return res.status(400).json({ error: "Invalid editor" });
    }

    const submission = await Submission.findByIdAndUpdate(
      submissionId,
      { editorID: editorId }, // Removed stage update
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//stage managing
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Get the submission ID from the URL parameter
  const { stage } = req.body; // Get the new stage value from the request body

  try {

    console.log("Received PUT request for submission ID:", id);
    console.log("New stage:", stage);
      // Find the submission by ID
      const submission = await Submission.findById(id);

      if (!submission) {
          return res.status(404).json({ message: 'Submission not found' });
      }

      // Update the stage of the submission
      submission.stage = stage;

      // Save the updated submission
      const updatedSubmission = await submission.save();

      // Return the updated submission
      res.status(200).json(updatedSubmission);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating submission stage' });
  }
});

//get all resubmitted articles for task population for editors
router.get("/tasks/:editorID", async (req, res) => {
  try {
    const {editorID} = req.params;
    if(!mongoose.Types.ObjectId.isValid(editorID)){
      return res.status(400).json({ message: "Invalid editor ID" });
    }
    const tasks = await Submission.find({editorID, isArticle:true, stage: "3", resubmitted:true}); // finds articles that are unpublished
    console.log("Fetched tasks:", tasks); // Debugging line
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





module.exports = router;
