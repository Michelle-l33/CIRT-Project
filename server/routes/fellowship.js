const express = require("express");
const mongoose = require("mongoose");
const Fellowship = require("../models/fellowship");
const router = express.Router();
const {uploadImage, s3Client} = require("../awsConnect");
const { route } = require("./user");

router.post("/upload-fellowship", uploadImage.single("img"), async (req, res) => {
    try {
      // Extract form fields
      const { name, year, bio, published, description } = req.body;
  
      // Ensure image upload success
      if (!req.file) {
        return res.status(400).json({ error: "Image upload failed!" });
      }
  
      // Create new fellowship with the image URL from S3
      const newFellowship = new Fellowship({
        name,
        year,
        bio,
        published,
        description,
        img: req.file.location, // S3 image URL
      });
  
      // Save to the database
      await newFellowship.save();
  
      // Respond with success message and image URL
      res.status(201).json({ message: "Fellowship created!", imageUrl: req.file.location });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;