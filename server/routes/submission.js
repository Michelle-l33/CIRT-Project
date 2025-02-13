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
    const users = await User.find({}, "-password"); // Exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All articles
router.get("/publications", async (req, res) => {
    try {
      const users = await User.find({}, "-password"); // Exclude password
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
