const express = require('express');
const { checkSchema } = require("express-validator"); 

const auth = require("../middlewares/auth");
const verifyAdmin = require('../middlewares/admin');
const { deleteMemberSchema } = require("../schemas/member.schema");
const { dataValidator } = require("../middlewares/validator");
const MemberController = require("../controllers/members.controller");

const router = express.Router();

router.get('/', 
  auth,
  verifyAdmin,
  MemberController.getMembers
);
router.post('/', 
  auth,
  verifyAdmin, 
  MemberController.createMember
);
router.delete(
  "/:id",
  auth,
  verifyAdmin,
  checkSchema(deleteMemberSchema),
  dataValidator,
  MemberController.deleteMember
);


module.exports = router;
