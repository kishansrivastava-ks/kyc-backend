const Application = require("../models/applicationModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.submitApplication = catchAsync(async (req, res, next) => {
  const newApplication = await Application.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      application: newApplication,
    },
  });
});

exports.getAllApplications = catchAsync(async (req, res, next) => {
  const applications = await Application.find();

  res.status(200).json({
    status: "success",
    results: applications.length,
    data: {
      applications,
    },
  });
});
