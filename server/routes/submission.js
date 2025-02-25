const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Submission = require("../models/Submission");
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

router.post("/:submissionID/record", async (req,res)=>{
  try{
      const {originalSubmissionID} = req.params;
      const {comment}= req.body;
      
      if(!mongoose.Types.ObjectId.isValid(originalSubmissionID)){
        return res.status(400).json({message: "Invalid author ID"});
      }

      const newComment = new Comment({
        originalSubmissionID,
        comment
      })

  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }

});
  


module.exports = router;
