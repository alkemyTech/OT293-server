const express = require("express");

const router = express.Router();
const CommentsController = require("../controllers/comments.controller");
const auth = require("../middlewares/auth");
const verifyAdmin = require("../middlewares/admin");
const { checkSchema } = require("express-validator");
const { createCommentSchema } = require("../schemas/comment.schema");
const { dataValidator } = require("../middlewares/validator");

router.get("/", auth, verifyAdmin, CommentsController.findAll);
router.post(
  "/",
  auth,
  checkSchema(createCommentSchema),
  dataValidator,
  CommentsController.create
);
router.put("/:id", auth, CommentsController.update);
router.delete("/:id", auth, CommentsController.delete);

module.exports = router;
