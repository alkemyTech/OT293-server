'use strict';

var express = require('express');

const UserController = require('../controllers/user.controller');

var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const container = await db.User.findAll()
  res.send(container)
});

router.delete('/:id', UserController.deleteUser);

module.exports = router;
