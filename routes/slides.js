const express = require('express');

// Middlewares
const auth = require('../middlewares/auth');
const verifyAdmin = require('../middlewares/admin');
const SlideController = require('../controllers/slides.controller');

const router = express.Router();

router.get('/', verifyAdmin, SlideController.findAll);
router.get(
  '/:id',
  auth,
  verifyAdmin,
  SlideController.findOne,
);

router.delete('/:id', verifyAdmin, SlideController.delete);

module.exports = router;
