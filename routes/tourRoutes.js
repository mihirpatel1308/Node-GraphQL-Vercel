const express = require("express");
const checkJwt = require("../middleware/auth");
const tourController = require("./../controllers/tourController");

const router = express.Router();

router
  .route("/")
  .get(checkJwt, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
