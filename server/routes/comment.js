const express = require("express");
const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const router = express.Router();

// Root route ("/") to fetch all comments
router.get("/", async (req, res) => {
    try {
        // Fetch all comments from the database
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send an error response if there's a failure
    }
});

// add comments
router.post("/", async (req,res)=>{
    try{
        
        const {originalSubmissionID, comment, commentorID, role}= req.body;
        
        if(!mongoose.Types.ObjectId.isValid(originalSubmissionID)){
          return res.status(400).json({message: "Invalid author ID"});
        }
  
        const newComment = new Comment({
          originalSubmissionID,
          comment,
          role,
          commentorID
        })
        // Save the new comment to the database
        const savedComment = await newComment.save();

        // Return a success response with the saved comment
        res.status(201).json({ message: "Comment saved successfully!", comment: savedComment });
    
    }
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  });
  // retrieve comments
  router.get("/:originalSubmissionID", async (req, res) => {
    try {
      const { originalSubmissionID } = req.params; // Get the submissionID from the URL parameter
  
      // Find comments where the submissionID matches the provided ID
      const comments = await Comment.find({ originalSubmissionID});
  
      console.log("Fetched Comments:", comments); // Debugging line
      res.json(comments); // Send the fetched comments as a JSON response
    } catch (error) {
      res.status(500).json({ error: error.message }); // Send an error response if there's a failure
    }
  });

  // retrieve comments of specific reviewer
  router.get("/:reviewerID", async (req, res) => {
    try {
      const { reviewerID } = req.params; // Get the submissionID from the URL parameter
  
      // Find comments where the submissionID matches the provided ID
      const comments = await Comment.find({ $or: [{ reviewerID1: reviewerID }, { reviewerID2: reviewerID }]});
  
      console.log("Fetched Comments:", comments); // Debugging line
      res.json(comments); // Send the fetched comments as a JSON response
    } catch (error) {
      res.status(500).json({ error: error.message }); // Send an error response if there's a failure
    }
  });

  module.exports = router;
    