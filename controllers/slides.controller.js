const db = require('../models/index');

class SlidesController {
  static async findAll(req, res, next) {
  }

  static async findOne(req, res, next) {

  }

  static async create(req, res, next) {

  }

  static async update(req, res, next) {

  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const slide = await db.Slide.findOne({ where: { id } });
      if (!slide) {
        res.status(404).json({ error: 'Slide not found' });
      }
      const isDeleted = await db.Slide.destroy({ where: { id } });
      if (!isDeleted) {
        res.status(500).json({ error: 'Slide could not be deleted' });
      }
      res.json({
        data: {
          message: 'Slide has been deleted correctly',
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = SlidesController;