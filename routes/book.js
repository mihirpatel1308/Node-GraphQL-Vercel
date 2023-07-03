var express = require("express");
// const checkJwt = require("../middleware/auth");
var router = express.Router();
const bookController = require("../controllers/bookController");

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

module.exports = router;
