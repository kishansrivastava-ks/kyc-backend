const Update = require("../models/updatesModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

// to add a new update to the database as an admin
exports.addUpdate = catchAsync(async (req, res, next) => {
  const newUpdate = await Update.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      update: newUpdate,
    },
  });
});

// get all updates from the database
exports.getAllUpdates = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Update.find(), req.query)
    .filter()
    .sort()
    .limitFields();
  const updates = await features.query;

  if (!updates) {
    return next(new AppError("No updates found", 404));
  }

  res.status(200).json({
    status: "success",
    results: updates.length,
    data: {
      updates,
    },
  });
});

// get a particular update based on mongoDB id
exports.getUpdate = catchAsync(async (req, res, next) => {
  const update = await Update.findById(req.params.id);
  if (!update) {
    return next(new AppError("No update found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      update,
    },
  });
});
