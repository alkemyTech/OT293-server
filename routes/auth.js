const express = require('express');
const { checkSchema } = require('express-validator');

const AuthController = require('../controllers/auth.controller');
const { loginSchema } = require('../schemas/auth.schema');
const { dataValidator } = require('../middlewares/validator');
// const UserController = require('../controllers/user.controller');

const router = express.Router();

// router.get('/me', UserController.getProfile);
// router.post('/register', Authentication.userRegister);
router.post('/login', checkSchema(loginSchema), dataValidator, AuthController.login);

module.exports = router;
