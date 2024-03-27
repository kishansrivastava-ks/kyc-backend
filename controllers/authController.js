const jwt = require("jsonwebtoken");
const RegUser = require("../models/regUserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newRegUser = await RegUser.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newRegUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      regUser: newRegUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //   check if email and password exits
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // check if the user exists and if the password is correct
  const user = await RegUser.findOne({ email }).select("+password");
  console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401)); // unauthorized
  }

  // if everything is okay, send JWT back to the client
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
