const express = require('express');

const router = express.Router();
const CategoriesController = require('../controllers/organizationController');
const verifyAdmin = require('../middlewares/admin');

router.delete('/delete/:id', verifyAdmin, CategoriesController.delete);

module.exports = router;
