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
  programsOffered: {
    type: [String],
    default: [],
    required: [true, "Programs offered by the college must be specified"],
  },
  campusFacilities: {
    type: String,
    required: [true, "You must provide campus facilities"],
  },
  feeStructure: {
    type: feeStructureSchema,
    required: [true, "Fee structure must be present"],
  },
  placementStats: {
    type: placementStatsSchema,
    required: [true, "Placement statistics must be provided"],
  },
  detailedFeeStructure: {
    type: String,
    required: [true, "Give a link to the detailed fee structure"],
    match: /^(ftp|http|https):\/\/[^ "]+$/,
  },
  detailedPlacementStats: {
    type: String,
    required: [true, "Give a link to detailed placement statistics"],
    match: /^(ftp|http|https):\/\/[^ "]+$/,
  },
});

const College = mongoose.model("College", collegeSchema);

module.exports = College;
