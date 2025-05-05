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

// Then modify your register route:
router.post("/register", async (req, res) => {
  try {
    // ... existing code ...

    const newUser = new User({
      // ... existing fields ...
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires
    });

    await newUser.save();

    // Add this email sending logic
    const verificationUrl = `https://cirt-project.vercel.app/verify-email?token=${verificationToken}`;
    const mailOptions = {
      to: lowerEmail,
      from: process.env.EMAIL_USER,
      subject: 'Verify Your Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Email Verification Required</h2>
          <p>Please click the button below to verify your email address:</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; 
                    padding: 12px 24px; 
                    background-color: #2563eb; 
                    color: white; 
                    text-decoration: none; 
                    border-radius: 4px;
                    margin: 20px 0;">
            Verify Email
          </a>
          <p>If you didn't create this account, you can safely ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ 
      message: "User registered successfully! Please check your email to verify your account."
    });
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

router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send(`
        <div style="text-align: center; padding: 40px;">
          <h2 style="color: #dc2626;">Invalid or expired verification link</h2>
          <p>Please request a new verification email.</p>
        </div>
      `);
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.send(`
      <div style="text-align: center; padding: 40px;">
        <h2 style="color: #16a34a;">Email Verified Successfully!</h2>
        <p>You can now login to your account.</p>
        <a href="https://cirt-project.vercel.app/login" 
           style="display: inline-block; 
                  margin-top: 20px;
                  padding: 12px 24px; 
                  background-color: #2563eb; 
                  color: white; 
                  text-decoration: none; 
                  border-radius: 4px;">
          Go to Login
        </a>
      </div>
    `);
  } catch (error) {
    res.status(500).send('Error verifying email');
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
