const mongoose = require("mongoose");

// this model is for the  college wise data

const feeStructureSchema = new mongoose.Schema({
  totalYearlyFees: {
    type: Number,
    required: true,
  },
  hostelAndMessFees: {
    type: Number,
    required: true,
  },
  instituteFees: {
    type: Number,
    required: true,
  },
});

const placementStatsSchema = new mongoose.Schema({
  numberOfCompaniesVisited: {
    type: Number,
    required: true,
  },
  highestPackageOffered: {
    type: Number,
    required: true,
  },
  averagePackageOffered: {
    type: Number,
    required: true,
  },
  totalPlacementPercentage: {
    type: Number,
    required: true,
  },
});

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "College must have a name"],
  },
  location: {
    type: String,
    required: [true, "Location of the college must be specified"],
  },
  nirfRank: {
    type: Number,
  },
  contact: {
    type: Number,
    required: [true, "A contact number must be provided"],
  },
  email: {
    type: String,
    required: [true, "A contact email must be provided"],
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    // This regex ensures that the email format is valid
  },
  typeOfInstitute: {
    type: String,
    enum: ["Government", "Private", "Public-Private Partnership"],
    required: [true, "Type of college must be specified"],
  },
  website: {
    type: String,
    match: /^(ftp|http|https):\/\/[^ "]+$/,
    required: [true, "You must provide college's website"],
  },
  establishmentYear: {
    type: Number,
    required: [true, "College must have an establishment year"],
  },
  coursesOffered: [
    {
      courseName: {
        type: String,
        required: [true, "Please provide course name"],
      },
      capacity: {
        type: Number,
        required: [true, "Please provide the course capacity"],
      },
    },
  ],
  campusFacilities: {
    type: String,
    required: [true, "You must provide campus facilities"],
  },
  feeStructure: {
    type: feeStructureSchema,
    required: [true, "Fee structure must be present"],
  },
  detailedFeeStructure: {
    type: String,
    required: [true, "Give a link to the detailed fee structure"],
    match: /^(ftp|http|https):\/\/[^ "]+$/,
  },
  placementStats: {
    type: placementStatsSchema,
    required: [true, "Placement statistics must be provided"],
  },
  detailedPlacementStats: {
    type: String,
    required: [true, "Give a link to detailed placement statistics"],
    match: /^(ftp|http|https):\/\/[^ "]+$/,
  },
  dressCode: {
    type: String,
    required: [
      true,
      "You must specify what dress code the college has. Enter NA if there is none",
    ],
  },
  fest: {
    type: [String],
    required: [true, "Please mention the college fests"],
  },
  gallery: [
    {
      type: String,
    },
  ],
});

const College = mongoose.model("College", collegeSchema);

module.exports = College;
