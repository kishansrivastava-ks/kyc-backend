const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "An update must have a title"],
  },
  summary: {
    type: String,
    required: [true, "An update must have a summary"],
  },
  content: {
    type: String,
    required: [true, "An update must have content"],
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College", // Reference to College model if you have one
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  importanceLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  attachments: [String], // Array of attachment URLs
});

const Update = mongoose.model("Update", updateSchema);

module.exports = Update;
