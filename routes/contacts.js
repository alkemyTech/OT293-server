const express = require('express');

const router = express.Router();
const verifyAdmin = require('../middlewares/admin');
const ContactsController = require('../controllers/contacts.controller');

router.get('/', verifyAdmin, ContactsController.findAll);

module.exports = router;
