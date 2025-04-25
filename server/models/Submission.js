const mongoose = require("mongoose");

// Define the schema
const submissionSchema = new mongoose.Schema({
  authorID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  collaborators: {type:[String], default:[]},
  document: { type: String, required: true },
  isPoster: { type: Boolean, default: false },
  isArticle: { type: Boolean, default: false },
  abstract: { type: String },
  tags: {type:[String], default: []},
  stage: {
    type: String,
    enum: ["1", "2", "3", "4", "0"], // Restrict values to valid stages 1 - new sub, 2 - sent to reviewer, 3 - sent to author, 4 - published, 0 - declined
    default: "1",
  },
  reviewerID1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviewerID2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  editorID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resubmitted: {type: Boolean, default: false},
  date: {
    type: Date,
    default: Date.now
  }
}, {timestamps: true });

// Create a model
const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;