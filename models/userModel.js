const mongoose = require("mongoose");

// this model is for the general users corresponding to the form filled on the home page
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
  },
  whatsAppNumber: {
    type: Number,
    unique: true,
    required: [true, "A user must provide a whatsapp number"],
  },
  currentStatus: {
    type: String,
    required: [true, "A user must provide his/her status"],
  },
  query: {
    type: String,
    required: [true, "You must provide a query to get connected"],
    enum: ["Admission Support", "Placement Stats", "College Options", "Others"],
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
