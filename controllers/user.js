const { check, validationResult, body } = require('express-validator');
const { positions, gender, experience, permissions, review } = require('../resources');
const User = require('../model')('User');

validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                check('password').exists().trim().isString()
                    .matches(/[A-Z]+/g).withMessage("password must include at least one capital letter")
                    .matches(/[a-z]+/g).withMessage("password must include at least one small letter")
                    .matches(/[0-9]+/g).withMessage("password must include at least one number")
                    .isLength({ min: 8, max: 20 }).withMessage("password must be 8-20 charcter long"),
                check('username').exists().trim().isString()
                    .matches(/[a-zA-Z0-9_]+/gi).withMessage("username can only contains numbers, letters and underscore")
                    .isLength({ min: 4, max: 15 }).withMessage('username must be 4-15 characters long')
                    .custom(val => {
                        return User.findOne({ username: val })
                            .then(result => {
                                if (result) { Promise.reject('username already exists') }
                            }).catch(Promise.resolve(true));
                    }),
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

        //   const { userName, email, phone, status } = req.body

        const user = await User.create(req.body);
        res.json(user)
    } catch (err) {
        return next(err)
    }
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
module.exports = {
    validate,
    createUser,
    validatePermissionToAction
}