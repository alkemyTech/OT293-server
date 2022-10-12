const express = require('express');
const { checkSchema } = require('express-validator');

const ownership = require('../middlewares/ownership');
const verifyAdmin = require('../middlewares/admin');

const { updateUserSchema } = require('../schemas/user.schema');

const UserController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

/* GET users listing. */

router.get('/', 
  auth,
  verifyAdmin, 
  UserController.getUsers
);

router.post('/register', UserController.createUser);

router.patch(
  '/:id',
  auth,
  ownership,
  checkSchema(updateUserSchema),
  UserController.partialUpdateUser,
);

router.delete(
  '/:id', 
  auth,
  ownership,
  UserController.deleteUser
);

module.exports = router;
