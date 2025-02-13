const mongoose = require("mongoose");

// Define the schema
const submissionSchema = new mongoose.Schema({
  authorID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required:true},  
  title: {type: String, required:true},
  firstName: {type: String, required: true},
  lastName:{type:String, required:true},
  document:{type:String, required:true},
  isPoster:{type: Boolean,default:false },
  isArticle:{type:Boolean, default:false},
  abstract: {type:String},
  stage: {type:Integer, default: 1} 
  // stage 1: new submission ("Just Submitted!")
  //stage 2: sent to reviewer ("Being Reviewed!")
  //stage 3: returned from reviewer (only for editor to see??)
  //stage 4: edits suggested to author("Final Edits")
  // stage 5: Submitted("Published!")
  
});

// Create a model
const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
