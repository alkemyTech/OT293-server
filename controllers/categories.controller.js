const db = require('../models/index');

class CategoriesController {

  static async findAll(req, res, next) {

    try {
      const categories = await db.Categories.findAll({
        attributes: ['name']
      });

      res.json({data: categories});

    } catch (error) {
      next(error);
    }
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
      const category = await db.Categories.findOne({ where: { id } });
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
      }
      const isDeleted = await db.Categories.destroy({ where: { id } });
      if (!isDeleted) {
        res.status(500).json({ error: 'Category could not be deleted' });
      }
      res.json({
        data: {
          message: 'Category has been deleted correctly',
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CategoriesController;
