const express = require("express");
const mongoose = require("mongoose");
const Fellowship = require("../models/Fellowship");
const router = express.Router();
const {upload, s3Client} = require("../awsConnect");
const {DeleteObjectCommand}= require("@aws-sdk/client-s3");
const { route } = require("./user");

router.post("/upload", upload.single("img"), async (req, res) => {
    try {
      console.log(req.body);  // To check the other form fields
      console.log(req.file);  // To check the uploaded file
      if (!req.file) {
        return res.status(400).json({ error: "File upload failed!" });
      }
  
      const { name, year, bio, published, fellowship } = req.body;
  
      const newFellowship = new Fellowship({
        img: req.file.location, // S3 file URL
        name,
        year,
        bio,
        published,
        fellowship
      });
  
      await newFellowship.save();
  
      res.status(201).json({ message: "File uploaded successfully!", fileUrl: req.file.location });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const fellowships = await Fellowship.find(); // Fetch all submissions from the database
      res.json(fellowships); // Send the submissions as a response
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch fellowships' });
    }
  });