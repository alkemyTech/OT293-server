const express = require('express');

const { checkSchema } = require('express-validator')

const { updateCategorySchema } = require('../schemas/category.schema');

const CategoriesController = require('../controllers/categories.controller');
const auth = require('../middlewares/auth');
const verifyAdmin = require('../middlewares/admin');

const router = express.Router();

router.get('/', 
    auth, 
    verifyAdmin, 
    CategoriesController.findAll
);

router.get(
    '/:id', 
    auth,
    verifyAdmin, 
    CategoriesController.findOne
);

router.post(
    '/', 
    auth,
    verifyAdmin, 
    CategoriesController.create
);

router.put('/:id', 
    auth,
    verifyAdmin,
    checkSchema(updateCategorySchema),
    CategoriesController.update
);

router.delete(
    '/:id', 
    auth,
    verifyAdmin, 
    CategoriesController.delete
);

module.exports = router;
