const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categories.controller');
const auth = require('../middlewares/auth');
const verifyAdmin = require('../middlewares/admin');

router.get('/', auth, verifyAdmin, CategoriesController.findAll)
router.post('/', verifyAdmin, CategoriesController.create);
router.delete('/:id', verifyAdmin, CategoriesController.delete);
router.get('/categories/:id', verifyAdmin, CategoriesController.findOne);

module.exports = router;
