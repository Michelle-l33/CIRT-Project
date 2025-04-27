const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const crypto = require('node:crypto');
const nodemailer = require('nodemailer');



// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, isAdmin, isAuthor, isEditor, isReviewer } = req.body;

    const lowerEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email: lowerEmail, password: hashedPassword, isAdmin, isAuthor, isEditor, isReviewer });
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
    // console.log(user.password)
    // console.log(password)
    //check if pass matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("fe")
      res.status(401).json({ message: 'Incorrect password.' });
    } else {
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

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ error: 'No user with that email exists' });
    }

    // Token generation logic

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiration;
    await user.save();


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email sending logic
    const resetUrl = `https://cirt-project.vercel.app/reset-password?token=${resetToken}`;
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `Password reset link:\n\n${resetUrl}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Reset email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Reset Password Route
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Validate password meets requirements (similar to your register validation)
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/update-profile/:id', async(req,res) =>{
try{
  const userID = req.params.id;
  const {newName, newEmail} = req.body;
  const user = await User.findById(userID);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  // If new email is provided and different from current
  if (newEmail && newEmail.toLowerCase() !== user.email) {
    const lowerEmail = newEmail.toLowerCase();
    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser && existingUser._id.toString() !== userID) {
      return res.status(400).json({ error: "Email is already in use." });
    }
    user.email = lowerEmail;
  }
    if (newName && newName !== user.name) {
      user.name = newName;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully." });
   
}  catch (error) {
  res.status(500).json({ error: error.message });
}
});

module.exports = router;
