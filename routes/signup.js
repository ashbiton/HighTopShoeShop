var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

/* sign up a new customer */
router.post('/',
    (req, _res, next) => {
        req.body.position = "customer";
        next();
    },
    userController.decryptPassword,
    userController.validate('createUser'),
    userController.registerUser,
);

module.exports = router;
