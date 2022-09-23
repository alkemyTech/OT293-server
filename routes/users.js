const express = require('express');

const UserController = require('../controllers/user.controller');
const verifyAdmin = require('../middlewares/admin');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/register', UserController.createUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
