const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAuthor: { type: Boolean, default: false },
  isEditor: { type: Boolean, default: false },
  isReviewer: { type: Boolean, default: false },
});

// Create a model
const User = mongoose.model("User", userSchema);

module.exports = User;
