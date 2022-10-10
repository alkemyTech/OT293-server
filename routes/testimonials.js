const express = require('express');
const router = express.Router();

const verifyAdmin = require('../middlewares/admin');
const TestimonialsController = require('../controllers/testimonials.controllers.js');
const auth = require('../middlewares/auth');

router.post(
    '/', 
    auth,
    verifyAdmin, 
    TestimonialsController.create
)
router.put(
    '/:id', 
    auth,
    verifyAdmin, 
    TestimonialsController.update
)

module.exports = router;