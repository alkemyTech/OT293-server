const express = require("express");

const MemberController = require("../controllers/members.controller");

const router = express.Router();

router.delete("/:id", MemberController.deleteMember);

module.exports = router;
