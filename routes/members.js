const express = require("express");
const { checkSchema } = require("express-validator");

const MemberController = require("../controllers/members.controller");
const { deleteMemberSchema } = require("../schemas/member.schema");
const { dataValidator } = require("../middlewares/validator");
const verifyAdmin = require("../middlewares/admin");

const router = express.Router();

router.delete(
  "/:id",
  verifyAdmin,
  checkSchema(deleteMemberSchema),
  dataValidator,
  MemberController.deleteMember
);

router.get('/', 
  verifyAdmin,
  MemberController.getMembers()
);

module.exports = router;
