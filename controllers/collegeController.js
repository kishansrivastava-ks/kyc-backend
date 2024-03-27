const College = require("../models/collegeModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.aliasTopColleges = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-nirfRank";
  req.query.fields = "name,location,nirfRank,typeOfInstitute,website";
  next();
};

// to add a new college to the database as an admin
exports.addCollege = catchAsync(async (req, res, next) => {
  const newCollege = await College.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      college: newCollege,
    },
  });
});

//   get all the colleges in the database

exports.getAllColleges = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(College.find(), req.query)
    .filter()
    .sort()
    .limitFields();
  const colleges = await features.query;

  if (!colleges) {
    return next(new AppError("No college found with that name", 404));
  }

  res.status(200).json({
    status: "success",
    results: colleges.length,
    data: {
      colleges,
    },
  });
});

// get a particular college based on mongoDB id
exports.getCollege = catchAsync(async (req, res, next) => {
  const college = await College.findById(req.params.id);
  if (!college) {
    return next(new AppError("No college found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      college,
    },
  });
});

exports.compareCollege = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const { college1Name, college2Name } = req.query;
  console.log(college1Name, college2Name);

  const college1 = await College.findOne({ name: college1Name });
  const college2 = await College.findOne({ name: college2Name });

  if (!college1 || !college2) {
    return next(
      new AppError(
        "Either/Both of the colleges not found. Try entering the correct name!",
        404
      )
    );
  }

  const comparisionResult = [college1, college2];

  res.status(200).json({
    status: "success",
    data: {
      comparisionResult,
    },
  });
});
