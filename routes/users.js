var express = require('express');
const db = require('../models/index');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const container = await db.User.findAll()
  res.send(container)
});

module.exports = router;
