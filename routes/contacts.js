'use strict';

const express = require('express');
const { checkSchema, body } = require('express-validator');

//Middlewares
const auth = require('../middlewares/auth');
const { dataValidator } = require("../middlewares/validator");

const { createContactSchema } = require('../schemas/contact.schema');
const ContactController = require('../controllers/contact.controller');

const router = express.Router();


router.post('/', 
    auth,
    checkSchema(createContactSchema),
    dataValidator,
    ContactController.store
);


module.exports = router;