const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();


// Register User
router.post("/register", async (req, res) => {
  try {
    const { email, password, isAuthor, isEditor, isReviewer } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, isAuthor, isEditor, isReviewer });
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
