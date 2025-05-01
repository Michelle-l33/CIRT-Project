const mongoose = require("mongoose");

// Define the schema
const fellowshipSchema = new mongoose.Schema({
    img: {type: String, required:true},
    name: {type: String, required:true},
    bio:{type: String, required:true},
    published: {type: String, required:true},
    description: {type: String, required:true},
});

// Create a model
const Fellowship = mongoose.model("Fellowship", fellowshipSchema);

module.exports = Fellowship;
