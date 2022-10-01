const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/members.controller');
const verifyAdmin = require('../middlewares/admin');

router.post('/', verifyAdmin, MemberController.createMember);

module.exports = router;