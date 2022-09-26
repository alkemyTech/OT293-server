const express = require('express');
const router = express.Router();
const NewController = require('../controllers/new.controller')

router.put('/:id', NewController.update);

module.exports = router;