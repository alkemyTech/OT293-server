const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/admin');
const TestimonialsController = require('../controllers/testimonials.controllers.js');

router.post('/', verifyAdmin, TestimonialsController.create)
router.put('/:id', verifyAdmin, TestimonialsController.update)
router.delete('/:id', verifyAdmin, TestimonialsController.delete);

module.exports = router;
