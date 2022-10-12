const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/members.controller');
const verifyAdmin = require('../middlewares/admin');
const { checkSchema } = require("express-validator");
const MemberController = require("../controllers/members.controller");
const { deleteMemberSchema } = require("../schemas/member.schema");
const { dataValidator } = require("../middlewares/validator");
const verifyAdmin = require("../middlewares/admin");

router.get('/', verifyAdmin, MemberController.getMembers);
router.post('/', verifyAdmin, MemberController.createMember);
router.put('/:id', verifyAdmin, MemberController.updateMember);
router.delete("/:id", verifyAdmin, checkSchema(deleteMemberSchema), dataValidator, MemberController.deleteMember);

module.exports = router;
