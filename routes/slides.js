const express = require('express');

const router = express.Router();
const verifyAdmin = require('../middlewares/admin');
const SlidesController = require('../controllers/slides.controller');

router.get('/', verifyAdmin, SlidesController.findAll);
router.get('/:id', verifyAdmin, SlidesController.delete);

module.exports = router;
