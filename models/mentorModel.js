const mongoose = require("mongoose");

// this model is for the seniors associated with a paritcular college for assisting the students
const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must provide your name"],
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
  },
  email: {
    type: String,
    required: [
      true,
      "you must provide your email address for contact purposes",
    ],
  },
  branch: {
    type: String,
    required: [true, "Please provide your branch."],
  },
  whatsAppNumber: {
    type: Number,
    unique: true,
    required: [
      true,
      "you must provide your whatsApp number for contact purposes",
    ],
  },
  lastSemResult: {
    type: String,
    required: [true, "Give a link to your transcript"],
    match: /^(ftp|http|https):\/\/[^ "]+$/,
  },
  resume: {
    type: [String],
    required: [true, "You must provide a link to your resume"],
    match: /^(ftp|http|https):\/\/[^ "]+$/,
  },
  allotedStudent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegUser",
  },
  messages: {
    type: String,
    default: "No messages yet",
    match: /^(ftp|http|https):\/\/[^ "]+$/,
  },
  collegeId: {
    type: String,
    required: true,
  },
});
const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
