const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  console.log("🔴🔴🔴", err);
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  // console.log("🔴🔴🔴", err);
  // const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];

  const message = `Phone number already registered! Please use another  number or login using existing account`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // operational errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // programming or other unknown errors
  else {
    console.error("Error", err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // console.log(err);

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    console.log("🔴🔴", err);
    console.log("into production");
    let error = { ...err };

    if (err.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (err.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (err.name === "ValidationError") {
      error = handleValidationError(error);
    }

    sendErrorProd(error, res);
  }
};
