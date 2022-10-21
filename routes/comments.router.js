const express = require('express');

const router = express.Router();
const CommentsController = require('../controllers/comments.controller');
const auth = require('../middlewares/auth');
const verifyAdmin = require("../middlewares/admin");

router.get('/', CommentsController.findAll);
router.post('/', CommentsController.create);
router.put('/:id', auth, verifyAdmin, CommentsController.update);
router.delete('/:id', CommentsController.delete);

module.exports = router;
