const express = require("express");

const router = express.Router();
const auth = require("../middlewares/auth");
const verifyAdmin = require("../middlewares/admin");
const BackOfficeController = require("../controllers/back-office.controller");

router.get(
  "/contacts",
  auth,
  verifyAdmin,
  BackOfficeController.findAllContacts
);

module.exports = router;
