const db = require('../models/index');

class CommentsController {
  static async findAll(req, res, next) {
    try {
      const comments = await db.Comments.findAll({
        attributes: ['body'],
        order: [['created_at', 'ASC']],
      });
      res.json(comments);
    } catch (e) {
      next(e);
    }
  }

  static async findOne(req, res, next) {

  }

  static async create(req, res, next) {
  }

  static async update(req, res, next) {

  }

  static async delete(req, res, next) {

  }
}

module.exports = CommentsController;
