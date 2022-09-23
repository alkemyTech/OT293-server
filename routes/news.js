const express = require('express');

const router = express.Router();
const { verifyAdmin } = require('../middlewares/admin');
const NewsController = require('../controllers/new.controller');

router.get('/:id', verifyAdmin, NewsController.findOne);

module.exports = router;
