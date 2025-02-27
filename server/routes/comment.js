const express = require("express");
const mongoose = require("mongoose");
const Comment = require("../models/Comment")
const router = express.Router();



// add comments
router.post("/record", async (req,res)=>{
    try{
      
        const {originalSubmissionID, comment}= req.body;
        
        if(!mongoose.Types.ObjectId.isValid(originalSubmissionID)){
          return res.status(400).json({message: "Invalid author ID"});
        }
  
        const newComment = new Comment({
          originalSubmissionID,
          comment
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
  router.get("/retrieve/:submissionID", async (req, res) => {
    try {
      const { originalSubmissionID } = req.params; // Get the submissionID from the URL parameter
  
      // Find comments where the submissionID matches the provided ID
      const comments = await Comment.find({ originalSubmissionID: originalSubmissionID });
  
      console.log("Fetched Comments:", comments); // Debugging line
      res.json(comments); // Send the fetched comments as a JSON response
    } catch (error) {
      res.status(500).json({ error: error.message }); // Send an error response if there's a failure
    }
  });

  module.exports = router;
    