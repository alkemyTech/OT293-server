const express = require('express');
const router = express.Router();
const ContactsController = require('../controllers/contacts.controller');
const verifyAdmin = require('../middlewares/admin');
const { checkSchema, body } = require('express-validator');
//Middlewares
const auth = require('../middlewares/auth');
const { dataValidator } = require("../middlewares/validator");
const { createContactSchema } = require('../schemas/contact.schema');
const ContactController = require('../controllers/contact.controller');

router.get("/", verifyAdmin, ContactsController.findAll);
router.post('/', auth, checkSchema(createContactSchema), dataValidator, ContactController.store);

module.exports = router;
