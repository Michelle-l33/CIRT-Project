const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const crypto = require('node:crypto');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');


// Add this transporter configuration at the TOP of the file
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Register User (updated with proper error handling)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body; // Only get essential fields
    const lowerEmail = email.toLowerCase();

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = Date.now() + 3600000; // 1 hour

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with verification fields
    const newUser = new User({
      name,
      email: lowerEmail,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires
    });

    await newUser.save();

    // Send verification email with error handling
    try {
      const verificationUrl = `https://cirt-project.vercel.app/verify-email?token=${verificationToken}`;
      await transporter.sendMail({
        to: lowerEmail,
        from: `Your App <${process.env.EMAIL_USER}>`,
        subject: 'Verify Your Email',
        html: `<p>Click to verify: <a href="${verificationUrl}">${verificationUrl}</a></p>`
      });
    } catch (emailError) {
      console.error("Email send error:", emailError);
      await User.deleteOne({ email: lowerEmail }); // Clean up user if email fails
      return res.status(500).json({ error: "Failed to send verification email" });
    }

    res.status(201).json({ 
      message: "Registration successful! Please check your email.",
      verificationSent: true
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      error: "Registration failed",
      details: error.message 
    });
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

    if (!user.isEmailVerified) {
      return res.status(403).json({ 
        message: 'Email not verified. Please check your email for verification link.'
      });
    }
    
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

router.post('/update-profile/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const { newName, newEmail } = req.body;
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

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add email verification route
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: "Server error during verification" });
  }
});

// Add resend verification email route
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ error: 'Email is already verified' });
    }

    // Generate new token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = Date.now() + 3600000;

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;
    await user.save();

    // Send email
    const verificationUrl = `https://cirt-project.vercel.app/verify-email?token=${verificationToken}`;
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Verify Your Email',
      html: `<p>Click this link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a></p>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Verification email resent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
