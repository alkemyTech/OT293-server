const express = require('express');
const router = express.Router();

const CategoriesController = require('../controllers/categories.controller.js');
const verifyAdmin = require('../middlewares/admin');

router.get('/categories/:id', verifyAdmin, CategoriesController.findOne);


module.exports = router;