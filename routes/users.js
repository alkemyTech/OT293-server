const express = require('express');

const UserController = require('../controllers/user.controller');
const { verifyAdmin } = require('../middlewares/admin');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/', verifyAdmin, UserController.getUsers);
router.delete('/:id', UserController.deleteUser);
router.post('/register', UserController.createUser);

module.exports = router;
