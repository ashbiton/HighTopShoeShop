var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
var passport = require('passport');

/* register a new user / an old user */
router.post('/',
    userController.validate('user'),
    userController.signInOrValidateSignUp,
    userController.registerUser
);

module.exports = router;
