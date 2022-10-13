const express = require('express');
const auth = require("../middlewares/auth");
const verifyAdmin = require('../middlewares/admin');
const { checkSchema } = require("express-validator");
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


router.get('/', verifyAdmin, MemberController.getMembers);
router.post('/', verifyAdmin, MemberController.createMember);
router.put('/:id', verifyAdmin, MemberController.updateMember);
router.delete("/:id", verifyAdmin, checkSchema(deleteMemberSchema), dataValidator, MemberController.deleteMember);

module.exports = router;
