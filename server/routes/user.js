const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();


// Register User
router.post("/register", async (req, res) => {
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

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const lowerEmail = email.toLowerCase();
  
      // Find user by email
      const user = await User.findOne({ email: lowerEmail });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      console.log(user.password)
      console.log(password)
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        console.log("fe")
        res.status(401).json({ message: 'Incorrect password.' });
      } else{
  res.status(200).json(user);
      }
  
      
    } catch (err) {
      res.status(400).json({ 
        message: 'Error during login', 
        error: err.message 
      });
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
