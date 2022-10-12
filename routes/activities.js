const express = require('express');

const router = express.Router();
const auth = require('../middlewares/auth');
const verifyAdmin = require('../middlewares/admin');
const ActivitiesController = require('../controllers/activities.controller');

router.post(
    '/', 
    auth,
    verifyAdmin, 
    ActivitiesController.createActivities
);
router.put(
    '/:id', 
    auth,
    verifyAdmin, 
    ActivitiesController.updateActivities
);

module.exports = router;
