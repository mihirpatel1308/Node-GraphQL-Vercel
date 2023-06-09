var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController')


router.route('/')
    .get(bookController.getAllBooks)
    .post(bookController.createBook);

module.exports = router;
