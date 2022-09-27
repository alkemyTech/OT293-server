const express = require("express");

const NewController = require("../controllers/new.controller");

const router = express.Router();

router.post("/", NewController.store);

module.exports = router;
