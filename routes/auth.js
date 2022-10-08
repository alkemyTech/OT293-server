const express = require('express');

const AuthController = require('../controllers/auth.controller');
// const UserController = require('../controllers/user.controller');

const router = express.Router();

// router.get('/me', UserController.getProfile);
// router.post('/register', Authentication.userRegister);
router.post('/login', AuthController.login);

module.exports = router;
