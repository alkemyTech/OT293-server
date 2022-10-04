const express = require('express');

const router = express.Router();
const verifyAdmin = require('../middlewares/admin');
const BackOfficeController = require('../controllers/backOffice.controller');

router.get('/contacts', verifyAdmin, BackOfficeController.findAllContacts);

module.exports = router;
