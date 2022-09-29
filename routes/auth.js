const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user.controller');
const Authentication = require('../controllers/Auth');

router.get('/me', UserController.getProfile);
router.post('/register', Authentication.userRegister);
router.post('/login', Authentication.userLogin);

module.exports = router;
