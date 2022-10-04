const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/members.controller');
const verifyAdmin = require('../middlewares/admin');
const { checkSchema } = require("express-validator");
const { deleteMemberSchema } = require("../schemas/member.schema");
const { dataValidator } = require("../middlewares/validator");

router.post('/', verifyAdmin, MemberController.createMember);
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
