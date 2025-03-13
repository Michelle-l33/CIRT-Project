const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const Submission = require("../models/Submission");
const Comment = require("../models/Comment");
const router = express.Router();
const upload = require("../awsConnect");


// Upload Submission
router.post("/upload", upload.single("document"), async (req, res) => {
  try {
    console.log(req.body);  // To check the other form fields
    console.log(req.file);  // To check the uploaded file
    if (!req.file) {
      return res.status(400).json({ error: "File upload failed!" });
    }

    const authorID = req.cookies.userID;  // Retrieve userID from cookies


    // Check if authorID is provided in the cookies
    if (!authorID) {
      return res.status(400).json({ error: "User ID is required in cookies" });
    }

    const { title, firstName, lastName, isPoster, isArticle, abstract } = req.body;

    const newSubmission = new Submission({
      authorID,
      title,
      firstName,
      lastName,
      document: req.file.location, // S3 file URL
      isPoster,
      isArticle,
      abstract,
      stage: "1",
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
    const posters = await Submission.find({isPoster:true}); //finds posters only
    res.json(posters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All articles
router.get("/publications", async (req, res) => {
    try {
      const articles = await Submission.find({isArticle:true}); // finds articles only
      res.json(articles);
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

// get all of authors submissions
router.get("/:authorID", async (req, res) => {
  try {
    const { authorID } = req.params;

    if(!mongoose.Types.ObjectId.isValid(authorID)){
      return res.status(400).json({ message: "Invalid author ID" });
    }

    const submission = await Submission.find(authorID);

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
    const submission = await Submission.findByIdAndUpdate(
      submissionId,
      { reviewerID: reviewerId },
      { new: true } // Return the updated document
    );

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//changes specific submission stage
router.put("/:id", async (req,res) =>{
  try {
    const { id } = req.params;
    const { stage } = req.body;

    const updatedSubmission = await Submission.findByIdAndUpdate(
        id,
        { stage },
        { new: true } // Return updated document
    );

    if (!updatedSubmission) {
        return res.status(404).json({ message: "Submission not found" });
    }

    res.json(updatedSubmission);
} catch (error) {
    res.status(500).json({ error: error.message });
}
})

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

  


module.exports = router;
