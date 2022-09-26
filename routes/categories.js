const express = require('express');

const router = express.Router();
const CategoriesController = require('../controllers/categories.controller');
const verifyAdmin = require('../middlewares/admin');

router.delete('/:id/', verifyAdmin, CategoriesController.delete);

module.exports = router;
