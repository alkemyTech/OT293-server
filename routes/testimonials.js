const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middlewares/admin');
const TestimonialsController = require('../controllers/activities.controller');

router.delete('/:id', verifyAdmin, TestimonialsController.deleteTestimonials);

module.exports = router;
