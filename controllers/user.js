const { check, validationResult, body } = require('express-validator');
const { positions, gender, experience, permissions, review } = require('../resources');
const User = require('../model')('User');

validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                body('username').exists().trim().isString()
                    .matches(/[a-zA-Z0-9_]+/gi)
                    .isLength({ min: 4, max: 15 })
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