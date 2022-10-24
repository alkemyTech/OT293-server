const { pagination } = require('../helpers/pagination');
const { getSignUrl } = require('../utils/s3');

const db = require('../models/index');

class CategoriesController {
  static async findAll(req, res, next) {
    try {
      const page = await pagination(req, 'Categories');
      res.json(page);
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const category = await db.Categories.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      return res.status(200).json({ data: category });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { name, description, image } = req.body;

      const [category, created] = await db.Categories.findOrCreate({
        where: { name },
        defaults: {
          name,
          description,
          image,
        },
      });

      if (created) {
        //Get image url from aws
        const imageUrl = await getSignUrl(image);
        return res
          .status(201)
          .json({ data: { ...category.dataValues, image: imageUrl } });
      } else {
        return res
          .status(400)
          .json({ message: `Category: ${name} already exists` });
      }
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;

      const category = await db.Categories.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const categoryUpdated = await category.update(req.body);

      //Get image url from aws
      const imageUrl = await getSignUrl(categoryUpdated.dataValues.image);

      res.json({ data: { ...categoryUpdated.dataValues, image: imageUrl } });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const category = await db.Categories.findOne({ where: { id } });
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      await db.Categories.destroy({ where: { id } });
      res.json({
        data: {
          destroy: true,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CategoriesController;
