const db = require("../models/index");

class CommentsController {
  static async findAll(req, res, next) {
    try {
      const comments = await db.Comments.findAll({
        attributes: ["body"],
        order: [["createdAt", "ASC"]],
      });
      res.json({ data: comments });
    } catch (e) {
      next(e);
    }
  }

  static async findOne(req, res, next) {}

  static async create(req, res, next) {
    try {
      const comment = await db.Comments.create(req.body);
      res.status(201).json({ data: comment });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req.body;

      const comment = await db.Comments.findByPk(id);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (comment.userId == req.user.id || req.user.roleId == 1) {
        const updatedComment = await comment.update({ body });
        return res.status(200).json({ data: updatedComment });
      }

      res.status(403).json({ message: "Unauthorized" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const deleteComment = await db.Comments.findOne({ where: { id } });

      if (!deleteComment) {
        return res.status(404).send("Comment not found");
      }

      if (deleteComment.userId == req.user.id || req.user.roleId == 1) {
        await db.Comments.destroy({ where: { id } });
        return res.status(200).json({ data: { id } });
      }

      res.status(403).json({ message: "Unauthorized" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentsController;
