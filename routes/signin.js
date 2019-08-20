var express = require('express');
var router = express.Router();
var passport = require('passport');

/* sign in a user */
router.post('/', passport.authenticate('local'),
    (req, res, next) => {
        console.log(req,res,next);
    });

module.exports = router;
