const express = require('express');

const { checkSchema } = require('express-validator')

const { updateCategorySchema } = require('../schemas/category.schema');

const CategoriesController = require('../controllers/categories.controller');
const auth = require('../middlewares/auth');
const verifyAdmin = require('../middlewares/admin');

const router = express.Router();

router.get('/', auth, verifyAdmin, CategoriesController.findAll);
router.get('/categories/:id', verifyAdmin, CategoriesController.findOne);
router.post('/', verifyAdmin, CategoriesController.create);

router.put('/:id', 
    auth,
    verifyAdmin,
    checkSchema(updateCategorySchema),
    CategoriesController.update
);

router.delete('/:id', verifyAdmin, CategoriesController.delete);

module.exports = router;
