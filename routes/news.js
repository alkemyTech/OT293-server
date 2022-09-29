const express = require("express");
const { checkSchema } = require("express-validator");

const NewController = require("../controllers/new.controller");
const { createNewSchema } = require("../schemas/new.schema");
const { dataValidator } = require("../middlewares/validator");
const { verifyAdmin } = require("../middlewares/admin");
const auth = require("../middlewares/auth");

const router = express.Router();

router.put("/:id", auth, NewController.update);

router.post(
  "/",
  verifyAdmin,
  checkSchema(createNewSchema),
  dataValidator,
  NewController.store
);

module.exports = router;
