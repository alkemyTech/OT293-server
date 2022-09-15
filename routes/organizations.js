const express = require('express');

const router = express.Router();
const OrganizationController = require('../controllers/organizationController');

router.get('/public', OrganizationController.findAll);

module.exports = router;
