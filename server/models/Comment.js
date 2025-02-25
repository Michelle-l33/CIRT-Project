const mongoose = require("mongoose");

// Define the schema
const commentSchema = new mongoose.Schema({
    originalSubmissionID: {type: mongoose.Schema.Types.ObjectId, ref: "Submission", required:true},
    comment: {type: String, required:true}

});

// Create a model
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
