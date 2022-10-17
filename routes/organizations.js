const express = require("express");
const { checkSchema } = require("express-validator");

const OrganizationController = require("../controllers/organizationController");
const { updateOrganizationSchema } = require("../schemas/organization.schema");
const { dataValidator } = require("../middlewares/validator");
const auth = require("../middlewares/auth");
const verifyAdmin = require("../middlewares/admin");

const router = express.Router();

router.get(
  "/public", 
  auth,
  OrganizationController.findAll
);

router.post(
  "/public/:id",
  auth,
  verifyAdmin,
  checkSchema(updateOrganizationSchema),
  dataValidator,
  OrganizationController.update
);

module.exports = router;
