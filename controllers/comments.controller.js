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
    const { userId, body, newsId } = req.body;
    try {
      await db.Comments.create({
        userId,
        body,
        newsId

      })

    } catch (error) {
      return res.status(200).json({
        msg: error.message });
    };
    return res.status(httpStatus.OK).json({
      msg: 'Creation has been successful'
    });
  }

  static async update(req, res, next) {
    try {
      const {id} = req.params;
      const {body} = req.body;
  
      const comment = await db.Comments.findByPk(id);
  
      if(!comment) {
        res.status(404).json({message: 'Comment not found'});
      } else {
        const updatedComment = await comment.set({
          body: body
        });
        await updatedComment.save();
        res.json(updatedComment);
      }
    } catch (error) {
      console.log(error.message)
    }

  }

  static async delete(req, res, next) {

  }
}

module.exports = CommentsController;
