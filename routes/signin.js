var express = require('express');
var router = express.Router();
const User = require('../model')('User');
const userController = require('../controllers/user');
var passport = require('passport');

/* sign in a user */
router.post('/',
    userController.decryptPassword,
    // passport.authenticate('local', { successRedirect: '/' })
    passport.authenticate('local'),
    async (req, res, next) => {
        console.log(req.user);
        res.status(200).send();
    }
);

module.exports = router;
