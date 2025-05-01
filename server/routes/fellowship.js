const express = require("express");
const mongoose = require("mongoose");
const Fellowship = require("../models/Fellowship");
const router = express.Router();
const {uploadImage, s3Client} = require("../awsConnect");


router.post("/upload-fellowship", uploadImage.single("img"), async (req, res) => {
    try {
      // Extract form fields
      const { name, bio, published, description } = req.body;
  
      // Ensure image upload success
      if (!req.file) {
        return res.status(400).json({ error: "Image upload failed!" });
      }
  
      // Create new fellowship with the image URL from S3
      const newFellowship = new Fellowship({
        img: req.file.location, // S3 image URL
        name,
        bio,
        published,
        description,
      });
  
      // Save to the database
      await newFellowship.save();
  
      // Respond with success message and image URL
      res.status(201).json({ message: "Fellowship created!"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const fellowship = await Fellowship.find(); // Fetch all submissions from the database
      res.json(fellowship); // Send the submissions as a response
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch fellowships' });
    }
  });
  
  module.exports = router;