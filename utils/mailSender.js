const nodemailer = require("nodemailer");
const catchAsync = require("./catchAsync");

const mailSender = catchAsync(async (email, title, body) => {
  // Create a Transporter to send emails
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Send emails to users
  let info = await transporter.sendMail({
    from: "www.sandeepdev.me - Sandeep Singh",
    to: email,
    subject: title,
    html: body,
  });

  console.log("Email info: ", info);

  return info;
});
module.exports = mailSender;
