const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// this model is for the users who will purchase a package
const regUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  role: {
    type: String,
    required: [true, "You must select a role"],
    enum: ["Menti", "Mentor", "Admin"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // this only works on CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same.",
    },
  },
});

// implenting encryption of password
regUserSchema.pre("save", async function (next) {
  // this fn runs only if the password is modified or newly created
  if (!this.isModified("password")) return next();

  // hashing the password
  this.password = await bcrypt.hash(this.password, 12);

  //   deleting the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// the following instance method will be available on all the documents of this collection
regUserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const RegUser = mongoose.model("RegUser", regUserSchema);

module.exports = RegUser;
