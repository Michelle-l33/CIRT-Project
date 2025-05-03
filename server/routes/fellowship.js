const express = require("express");
const mongoose = require("mongoose");
const Fellowship = require("../models/Fellowship");
const router = express.Router();
const {uploadImage, s3Client} = require("../awsConnect");

router.get('/', async (req, res) => {
    try {
      const fellowship = await Fellowship.find(); // Fetch all submissions from the database
      res.json(fellowship); // Send the submissions as a response
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch fellowships' });
    }
  });

router.post("/upload-fellowship", uploadImage.single("img"), async (req, res) => {
    try {
      // Extract form fields
      const { name,year, bio, published, description } = req.body;
  
      // Ensure image upload success
      if (!req.file) {
        return res.status(400).json({ error: "Image upload failed!" });
      }
  
      // Create new fellowship with the image URL from S3
      const newFellowship = new Fellowship({
        img: req.file.location, // S3 image URL
        name,
        year,
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

  router.put("/:id", upload.single("img"), async (req, res) => {
    try {
      const fellowId = req.params.id;
  
      const updatedFields = {
        name: req.body.name,
        year: req.body.year,
        bio: req.body.bio,
        fellowship: req.body.fellowship,
        published: req.body.published,
      };
  
      if (req.file) {
        updatedFields.img = `/uploads/fellows/${req.file.filename}`; // Save relative path
      }
  
      const updatedFellow = await Fellowship.findByIdAndUpdate(
        fellowId,
        updatedFields,
        { new: true }
      );
  
      res.json(updatedFellow);
    } catch (error) {
      console.error("Error updating fellow:", error);
      res.status(500).json({ error: "Failed to update fellow" });
    }
  });


  
  module.exports = router;