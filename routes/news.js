const express = require("express");
const { checkSchema } = require("express-validator");

const NewController = require("../controllers/new.controller");
const { createNewSchema } = require("../schemas/new.schema");
const { dataValidator } = require("../middlewares/validator");
const verifyAdmin = require("../middlewares/admin");
const auth = require("../middlewares/auth");

const router = express.Router();

// router.get("/:id", verifyAdmin, NewController.findOne);
router.put(
  "/:id", 
  auth, 
  verifyAdmin,
  NewController.update
);

router.post(
  "/",
  auth,
  verifyAdmin,
  checkSchema(createNewSchema),
  dataValidator,
  NewController.store
);

router.delete(
  '/:id', 
  auth,
  verifyAdmin, 
  NewController.delete
);

module.exports = router;
