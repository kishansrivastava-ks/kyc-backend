const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
  },
  phone: {
    type: Number,
    required: [true, "A user must provide a contact number"],
  },
  status: {
    type: String,
    required: [true, "A user must provide his/her status"],
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
