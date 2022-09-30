const express = require("express");
const { checkSchema } = require("express-validator");

const OrganizationController = require("../controllers/organizationController");
const { updateOrganizationSchema } = require("../schemas/organization.schema");
const { dataValidator } = require("../middlewares/validator");
const verifyAdmin = require("../middlewares/admin");

const router = express.Router();

router.get("/public", OrganizationController.findAll);
router.post(
  "/public/:id",
  verifyAdmin,
  checkSchema(updateOrganizationSchema),
  dataValidator,
  OrganizationController.update
);

module.exports = router;
