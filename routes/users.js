'use strict';

var express = require('express');

const UserController = require('../controllers/user.controller');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', UserController.deleteUser);

module.exports = router;
