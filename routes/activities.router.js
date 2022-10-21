const express = require("express");
const { checkSchema } = require("express-validator");

const auth = require("../middlewares/auth");
const { dataValidator } = require("../middlewares/validator");
const verifyAdmin = require("../middlewares/admin");
const ActivitiesController = require("../controllers/activities.controller");
const {
  createActivitySchema,
  updateActivitySchema,
} = require("../schemas/activity.schema");

const router = express.Router();

router.post(
  "/",
  auth,
  verifyAdmin,
  checkSchema(createActivitySchema),
  dataValidator,
  ActivitiesController.create
);
router.put(
  "/:id",
  auth,
  verifyAdmin,
  checkSchema(updateActivitySchema),
  dataValidator,
  ActivitiesController.update
);

module.exports = router;
