const express = require("express");
// const authController = require("../controllers/authController");
const mentorController = require("../controllers/mentorController");

const router = express.Router();

router
  .route("/")
  .get(mentorController.getAllMentors)
  .post(mentorController.createMentor);

router.route("/:id").get(mentorController.getMentor);

module.exports = router;
