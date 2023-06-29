const express = require("express");
const tourController = require("./../controllers/tourController");

const router = express.Router();

const checkJwtAsync = require("../middleware/auth");

router
  .route("/")
  .get(checkJwtAsync, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
