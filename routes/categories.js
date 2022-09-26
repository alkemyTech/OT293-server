const express = require('express');
const Authentication = require('../controllers/Categories');
const router = express.Router();
const CategoriesController = require('../controllers/categories.controller');
const verifyAdmin = require('../middlewares/admin');

router.delete('/:id/', verifyAdmin, CategoriesController.delete);
router.post('/', Authentication.createCategory);

module.exports = router;
