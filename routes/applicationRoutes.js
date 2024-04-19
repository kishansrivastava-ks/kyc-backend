const express = require("express");
const applicationController = require("../controllers/applicationController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(applicationController.submitApplication)
  .get(
    authController.protect,
    authController.restrictTo("Admin"),
    applicationController.getAllApplications
  );

module.exports = router;
