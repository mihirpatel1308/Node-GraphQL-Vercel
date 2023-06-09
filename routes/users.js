var express = require('express');
var router = express.Router();
const userController = require('./../controllers/tourController')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   debugger
//   res.send('respond with a resource.......');
// });
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

module.exports = router;
