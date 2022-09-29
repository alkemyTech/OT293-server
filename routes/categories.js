const express = require('express');

const router = express.Router();
const CategoriesController = require('../controllers/categories.controller');

const auth = require('../middlewares/auth');
const verifyAdmin = require('../middlewares/admin');

router.get('/',
    auth,
    verifyAdmin,
    CategoriesController.findAll
)

router.delete('/:id/', verifyAdmin, CategoriesController.delete);

module.exports = router;
