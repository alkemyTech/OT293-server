const express = require('express');
const router = express.Router();
const Activity = require('../controllers/activities.controller')

router.post('/', Activity.createActivities)

module.exports = router