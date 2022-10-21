const { validationResult } = require("express-validator");
const { pagination } = require("../helpers/pagination");
const db = require("../models/index");

class CategoriesController {
  static async findAll(req, res, next) {
    try {
      const page = await pagination(req, "Categories");
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
        return res.status(404).json({ message: "Category not found" });
      }
      return res.status(200).json({ data: category });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      // Obtener información.
      const { name, description, image } = req.body;

      //  Buscar categoría
      const container = await db.Categories.findOne({
        where: { name: name.toLowerCase() },
      });

      // Si no existe el nombre, crear categoría
      if (!container) {
        const category = await db.Categories.create({
          name: name.toLowerCase(),
          description,
          image,
        });
        res.status(201).json({ data: category });
      } else {
        // Si existe el nombre
        res.status(400).json({
          message: "This name is taken, try with another one",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const category = await db.Categories.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const categoryUpdated = await category.update(req.body);

      res.json({ data: categoryUpdated });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const category = await db.Categories.findOne({ where: { id } });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      const isDeleted = await db.Categories.destroy({ where: { id } });
      if (!isDeleted) {
        return res.status(500).json({ error: "Category could not be deleted" });
      }
      res.json({
        data: {
          id: idDeleted.id,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CategoriesController;
