const express = require('express');

const router = express.Router();
const { verifyAdmin } = require('../middlewares/admin');
const NewController = require('../controllers/new.controller');
const auth = require('../middlewares/auth');

router.get('/:id', verifyAdmin, NewController.findOne);
router.put('/:id', auth, NewController.update);

module.exports = router;
