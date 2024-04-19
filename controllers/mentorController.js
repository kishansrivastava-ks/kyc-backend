const Mentor = require("../models/mentorModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createMentor = catchAsync(async (req, res, next) => {
  const newMentor = await Mentor.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      mentor: newMentor,
    },
  });
});

exports.getAllMentors = catchAsync(async (req, res, next) => {
  const mentors = await Mentor.find();

  res.status(200).json({
    status: "success",
    results: mentors.length,
    data: {
      mentors,
    },
  });
});

exports.getMentor = catchAsync(async (req, res, next) => {
  const mentor = await Mentor.findById(req.params.id);
  if (!mentor) {
    return next(new AppError("No mentor found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      mentor,
    },
  });
});
