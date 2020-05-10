// import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// config a model for interviewers data
const interviewerModel = new Schema({
  name: { type: String, required: true },
  businessEmail: { type: String, required: true },
  profileImageURL: { type: String, required: true },
  ableSubjects: { type: Array, required: true },
  availabilityLink: { type: String, required: true }
},
{
  timestamps: true
});

// export model
module.exports = mongoose.model("interviewer", interviewerModel);
