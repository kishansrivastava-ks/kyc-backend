const express = require("express");
const collegeController = require("../controllers/collegeController");
const authController = require("../controllers/authController");

const router = express.Router();

// route to get the top 10 colleges based on NIRF ranking
router
  .route("/top-10-colleges")
  .get(collegeController.aliasTopColleges, collegeController.getAllColleges);

router
  .route("/")
  .get(collegeController.getAllColleges)
  .post(
    authController.protect,
    authController.restrictTo("Admin"),
    collegeController.addCollege
  );

router.route("/compare").get(collegeController.compareCollege);

router.route("/:id").get(collegeController.getCollege);

// router.get("/compare", collegeController.compareCollege);

module.exports = router;
