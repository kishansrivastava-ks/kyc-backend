const mongoose = require("mongoose");

// this model is for the seniors associated with a paritcular college for assisting the students
const seniorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A senior must have a name"],
  },
  email: {
    type: String,
    required: [true, "A senior must have an email"],
  },
  whatsAppNumber: {
    type: Number,
    unique: true,
    required: [true, "A senior must provide a whatsapp number"],
  },
  associatedCollege: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
  },
  allotedStudent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegUser",
  },
});
const Senior = mongoose.model("Senior", seniorSchema);

module.exports = Senior;
