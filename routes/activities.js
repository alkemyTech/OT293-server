const express = require('express');

const router = express.Router();
const { verifyAdmin } = require('../middlewares/admin');
const ActivitiesController = require('../controllers/activities.controller');

router.get('/:id', verifyAdmin, ActivitiesController.updateActivities);

module.exports = router;
