const express = require('express');

const SlidesController = require('../controllers/slides.controller');
const verifyAdmin = require('../middlewares/admin');

const router = express.Router();

router.get('/:id', verifyAdmin, SlidesController.delete);
router.put('/:id', SlidesController.update);

module.exports = router;
