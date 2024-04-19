const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, "You must provide your name!"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "You must specify your gender!"],
  },
  programChosen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },
  doubt: {
    type: String,
    required: [
      true,
      "You should specify your doubt to let your mentor know about your query",
    ],
  },
  preferredColleges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: [true, "Choose your preferred colleges"],
    },
  ],
  preferredSeniors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Senior",
      // required: [true, "Choose your preferred seniors"],
    },
  ],
  preferredTimeSlot: {
    type: String,
    // required: [true, "Choose a preferred time slot"],
  }, // You can customize this field as needed
  email: {
    type: String,
    required: [true, "You must provide your email"],
  },
  whatsAppNumber: {
    type: String,
    required: [true, "You must provide your WhatsApp number"],
  },
  scheduledSessions: [
    {
      mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
      },
      dateTime: {
        type: Date,
      },
    },
  ],
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
