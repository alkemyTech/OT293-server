const express = require('express');

const router = express.Router();
const { verifyAdmin } = require('../middlewares/admin');

router.get('/:id', verifyAdmin);

module.exports = router;
