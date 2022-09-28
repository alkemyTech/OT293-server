const express = require('express');
const { checkSchema } = require('express-validator');

const ownership = require('../middlewares/ownership');
const verifyAdmin = require('../middlewares/admin');

const { updateUserSchema } = require('../schemas/user.schema');

const UserController = require('../controllers/user.controller');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/', verifyAdmin, UserController.getUsers);

router.post('/register', UserController.createUser);

router.patch(
  '/:id',
  ownership,
  checkSchema(updateUserSchema),
  UserController.partialUpdateUser,
);

router.delete('/:id', UserController.deleteUser);

module.exports = router;
