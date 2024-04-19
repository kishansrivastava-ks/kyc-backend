const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

//function to send emails
catchAsync(async function sendVerificationEmail(email, otp) {
  const mailResponse = await mailSender(
    email,
    "Verification Email",
    `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
  );
  console.log("Email sent successfully: ", mailResponse);
});

otpSchema.pre(
  "save",
  catchAsync(async function (next) {
    console.log("New document saved to the database");
    // Only send an email when a "new" document is created
    if (this.isNew) {
      await sendVerificationEmail(this.email, this.otp);
    }
    next();
  })
);

module.exports = mongoose.model("OTP", otpSchema);
