const db = require('../models/index');

class SlidesController {
  static async findAll(req, res, next) {
    try {
      const slides = await db.Slide.findAll({
        attributes: ['order', 'imageUrl'],
      });
      res.json(slides);
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
module.exports = SlidesController;
