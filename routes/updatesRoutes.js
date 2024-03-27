const express = require("express");
const updatesController = require("../controllers/updatesController");

const router = express.Router();

router
  .route("/")
  .get(updatesController.getAllUpdates)
  .post(updatesController.addUpdate);

router.route("/:id").get(updatesController.getUpdate);

module.exports = router;
