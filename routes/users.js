const express = require('express');
const { checkSchema } = require('express-validator');

const ownership = require('../middlewares/ownership');
const verifyAdmin = require('../middlewares/admin');

const { updateUserSchema } = require('../schemas/user.schema');
const auth = require('../middlewares/auth');
const UserController = require('../controllers/user.controller');

const router = express.Router();

/* GET users listing. */

router.delete('/:id', UserController.deleteUser);
router.get('/', verifyAdmin, UserController.getUsers);
router.post('/register', UserController.createUser);

router.patch(
  '/:id',
  auth,
  ownership,
  checkSchema(updateUserSchema),
  UserController.partialUpdateUser,
);

router.delete('/:id', UserController.deleteUser);

module.exports = router;
