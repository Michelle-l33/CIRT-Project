const mongoose = require("mongoose");

// Define the schema
const fellowshipSchema = new mongoose.Schema({
    img: {type: String, required:true},
    name: {type: String, required:true},
    year: {type:String, require:true},
    bio:{type: String, required:true},
    published: {type: String, required:true},
    description: {type: String, required:true},
});

// Create a model
const Fellowship = mongoose.model("Fellowship", fellowshipSchema);

module.exports = Fellowship;
