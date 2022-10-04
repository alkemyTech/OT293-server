const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/admin');
const TestimonialsControllers = require('../controllers/Testimonials');
const TestimonialsController = require('../controllers/testimonials.controllers.js');

router.post('/', verifyAdmin, TestimonialsControllers.create)
router.put('/:id', verifyAdmin, TestimonialsController.update)
router.delete('/:id', verifyAdmin, TestimonialsController.deleteTestimonials);

module.exports = router;
