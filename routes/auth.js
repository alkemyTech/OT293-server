const express = require('express');
const router = express.Router();
const Authentication = require('../controllers/Auth')

router.post('/register', Authentication.userRegister)
router.post('/login', Authentication.userLogin)

module.exports = router