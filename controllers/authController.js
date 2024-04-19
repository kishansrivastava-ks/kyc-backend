const { promisify } = require("util");
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
    role: req.body.role,
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

exports.protect = catchAsync(async (req, res, next) => {
  // 1. getting token and check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);
  if (!token) {
    return next(
      new AppError("You are not logged in. Please login to get access", 401)
    );
  }

  // 2. verification of the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  // 3. check if the user still exists
  const freshUser = await RegUser.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError("The user belonging to the token no longer exists.", 401)
    );

  // 4. check if the user changed the password after the jwt was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please login again.", 401)
    );
  }

  // grant access to protected route
  req.regUser = freshUser; // 🔴🔴 the user has been put to the req, now it can be used to get access to logged in user information
  // this request (req) object would travel to the next middleware where all of its information can be used
  next();
});

// the following would be used to restrict the access to any routes to the admin only
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array
    if (!roles.includes(req.regUser.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 401)
      );
    }

    next();
  };
};
