'use strict';

var express = require('express');
const { checkSchema } = require('express-validator');

const auth = require('../middlewares/auth');
const ownership = require('../middlewares/ownership');

const { updateUserSchema } = require('../schemas/user.schema');

const UserController = require('../controllers/user.controller');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.patch('/:id', 
  ownership,
  checkSchema(updateUserSchema),
  UserController.partialUpdateUser,
);

router.delete('/:id', UserController.deleteUser);

module.exports = router;
