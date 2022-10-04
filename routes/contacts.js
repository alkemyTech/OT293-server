const express = require('express');
const router = express.Router();
const ContactsController = require('../controllers/contacts.controller');
const verifyAdmin = require('../middlewares/admin');

router.get("/", verifyAdmin, ContactsController.findAll);

module.exports = router;

