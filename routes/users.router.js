const express = require("express");
const { checkSchema } = require("express-validator");

const ownership = require("../middlewares/ownership");
const verifyAdmin = require("../middlewares/admin");

const { updateUserSchema } = require("../schemas/user.schema");
const auth = require("../middlewares/auth");
const UserController = require("../controllers/users.controller");
const router = express.Router();

/* GET users listing. */

router.get("/", auth, verifyAdmin, UserController.findAll);

router.post("/register", UserController.create);

router.patch(
  "/:id",
  auth,
  ownership,
  checkSchema(updateUserSchema),
  UserController.update
);

router.delete("/:id", auth, ownership, UserController.delete);

module.exports = router;
