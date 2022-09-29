const express = require('express');

//Middlewares
const auth = require('../middlewares/auth');
const verifyAdmin = require('../middlewares/admin');

const SlideController = require('../controllers/slide.controller');

const router = express.Router();

router.get('/:id', 
    auth,
    verifyAdmin,
    SlideController.findOne
);

module.exports = router;