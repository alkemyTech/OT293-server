const express = require('express');

const router = express.Router();
const CommentsController = require('../controllers/comments.controller');

router.get('/', CommentsController.findAll);

module.exports = router;
