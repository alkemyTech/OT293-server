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
    try {

      const { id } = req.params;

      const slide = await db.Slide.findByPk(id);

      if(!slide) {
        return res.status(404).json({message: 'Slide not found'});
      }

      res.json({data: slide});

    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {

  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;

      const slide = await db.Slide.findByPk(id);
      if (!slide) {
        res.status(404).json({ error: "Slide Not Found" });
      }
      await slide.update(body);
      res.json(slide);
    } catch (err) {
      next(err);
    }
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
