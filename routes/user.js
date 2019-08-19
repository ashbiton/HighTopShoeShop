var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

/* get a specific user */
router.get('/:id', async function (req, res, next) {
});

/* add a new user */
router.post('/',
  userController.validatePermissionToAction,
  userController.validate('user'),
  userController.validate('createUser'),
  userController.validate('createUserOptional'),
  userController.createUser
);

/* delete a user */
router.delete('/', async function (req, res, next) {

});

/* update a user profile*/
router.put('/', async function (req, res, next) {

});


module.exports = router;
