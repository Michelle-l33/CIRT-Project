const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Submission = require("../models/Submission");
const router = express.Router();


// Upload Submission
router.post("/upload", async (req, res) => {
  try {
    const { authorID, title, firstName, lastName, document, isPoster, isArticle, abstract } = req.body;

    const newSubmission = new Submission({ authorID, title, firstName, lastName, document, isPoster, isArticle, abstract });
    await newSubmission.save();
    
    res.status(201).json({ message: "Submission Uploaded Successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Get All posters
router.get("/gallery", async (req, res) => {
  try {
    const posters = await Submisison.find({isPoster:true}); //finds posters only
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

  router.get("/submission/:id", async (req, res) => {
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
  


module.exports = router;
