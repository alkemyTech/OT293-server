const db = require('../models/index');

const { validationResult } = require('express-validator');

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
       try {
            const { id } = req.params;
            const category = await db.Categories.findOne(
                {
                    where: { id },
                    include: {
                        attributes: ['name', 'description', 'image'],
                        through: { attributes: [] }
                    }
                }
            );

            if (!category) {
                return res.status(404).json({message: 'Category not found'});
            } else {
                return res.status(200).json(category);
            }
            
        } catch (error) {
            console.log(error.message)
        }

    }

  }

  static async create(req, res, next) {

  }

  static async update(req, res, next) {

    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;

      const category = await db.Categories.findByPk(id);

      if(!category) {
        return res.status(404).json({message: 'Category not found'});
      }

      const categoryUpdated = await category.update(req.body);

      res.json({data: categoryUpdated});
      
    } catch (e) {
      next(e)
    }

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
