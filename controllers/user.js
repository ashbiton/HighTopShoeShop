const { check, validationResult } = require('express-validator');
const { positions, gender, experience, permissions, review } = require('../project-client/src/resources');
const User = require('../model')('User');
const Customer = require('../model')('Customer');
var passport = require('passport');
const _ = require('lodash');

validate = (method) => {
    switch (method) {
        case 'user': {
            return [
                check('password').exists().trim().isString()
                    .matches(/[A-Z]/).withMessage("password must include at least one capital letter")
                    .matches(/[a-z]/).withMessage("password must include at least one small letter")
                    .matches(/[0-9]/).withMessage("password must include at least one number")
                    .isLength({ min: 8, max: 20 }).withMessage("password must be 8-20 charcter long"),
                check('username').exists().trim().isString()
                    .matches(/^[a-zA-Z0-9_]+$/).withMessage("username can only contains numbers, letters and underscore")
                    .isLength({ min: 4, max: 15 }).withMessage('username must be 4-15 characters long')
                    .custom(val => {
                        return User.findOne({ username: val })
                            .then(result => {
                                if (result) { Promise.reject('username already exists') }
                            }).catch(Promise.resolve(true));
                    })
            ];
        }
        case 'createUser': {
            return [
                check('name', 'name is a required field, should be at least 2 chars long').exists().isString().trim()
                    .isLength({ min: 2 })
                    .isAlpha(),
                check('surname', 'surname is a required field, should be at least 2 chars long').exists().isString().trim()
                    .isLength({ min: 2 })
                    .isAlpha(),
                check('email', 'Invalid email').exists()
                    .isEmail(),
                check('position').exists().trim().not().isEmpty().isIn(positions.values)
            ];
        }
        case 'createUserOptional': {
            return [
                check('gender').optional().trim().isString()
                    .isIn(gender.values),
                check('salary').optional().trim()
                    .isNumeric(),
                check('phone').optional().trim()
                    .isMobilePhone('he-IL'),
                check('precent').optional()
                    .isInt({ min: 20, max: 100 }),
                check('experience').optional().trim().isString()
                    .isIn(experience.values),
                check('active').optional()
                    .isBoolean(),
                check('hiredAt').optional().not().isEmpty()
                    .toDate()
                    .custom(val => (val && new Date(val).toDateString() === new Date(Date.now()).toDateString())),
                check('review').optional().not().isEmpty().isString()
                    .isIn(review.values)
            ]
        }
    }
}

createUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        let userObj = req.body;
        const model = require('../model')(_.capitalize(userObj.position));
        let password = userObj.password;
        delete userObj.password;
        let user = await model.create(req.body);
        await user.setPassword(password);
        await user.save();
        res.status(200).send();
    } catch (err) {
        return res.status(500).json({ errors: err });
    }
    next();
}

validatePermissionToAction = (req, res, next) => {
    const user = req.user;
    if (!user) {
        res.status(401).send();
        return;
    }
    const position = user.position;
    if (!position || !permissions.user.includes(position)) {
        res.status(401).send();
        return;
    }
    next();
}

registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        let userObj = req.body;
        let password = userObj.password;
        delete userObj.password;
        let user = await Customer.create(req.body);
        await user.setPassword(password);
        await user.save();
        const { err } = await user.authenticate(password);
        if (err) { throw new Error(err); }
        res.status(200).send();
    } catch (err) {
        return res.status(500).json({ errors: err });
    }
    next();
}
module.exports = {
    validate,
    createUser,
    registerUser,
    validatePermissionToAction
}