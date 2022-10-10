const express = require('express');
const { checkSchema } = require('express-validator');

const AuthController = require('../controllers/auth.controller');
const { loginSchema, registerSchema } = require('../schemas/auth.schema');
const { dataValidator } = require('../middlewares/validator');

const router = express.Router();

router.get('/me', AuthController.getProfile);
router.post('/register', checkSchema(registerSchema), dataValidator, AuthController.register);
router.post('/login', checkSchema(loginSchema), dataValidator, AuthController.login);

module.exports = router;
