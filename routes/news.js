const express = require('express');
const router = express.Router();
const NewController = require('../controllers/new.controller');
const auth = require('../middlewares/auth');

router.put('/:id', auth ,NewController.update);

module.exports = router;