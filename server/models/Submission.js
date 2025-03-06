const mongoose = require("mongoose");

// Define the schema
const submissionSchema = new mongoose.Schema({
  authorID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  document: { type: String, required: true },
  isPoster: { type: Boolean, default: false },
  isArticle: { type: Boolean, default: false },
  abstract: { type: String },
  stage: {
    type: String,
    enum: ["1", "2", "3", "4", "0"], // Restrict values to valid stages 1 - new sub, 2 - sent to reviewer, 3 - sent to author, 4 - published, 0 - declined
    default: "1",
  },
  reviewerID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // New field for reviewer
  editorID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

// Create a model
const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;