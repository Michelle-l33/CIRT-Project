const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Submission = require("../models/Submission");
const router = express.Router();


// Register User
router.post("/upload", async (req, res) => {
  try {
    const { name, email, password,isPublic, isAuthor, isEditor, isReviewer } = req.body;

    const lowerEmail = email.toLowerCase();
    
    const existingUser = await User.findOne({ email:lowerEmail });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email:lowerEmail, password: hashedPassword,isPublic, isAuthor, isEditor, isReviewer });
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully!" });
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
