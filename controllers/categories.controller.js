const { validationResult } = require("express-validator");
const db = require("../models/index");

class CategoriesController {
  static async findAll(req, res, next) {
    try {
      const { page = 0 } = req.query;
      const CATEGORIES_IN_A_PAGE = 10;

      const options = {
        limit: CATEGORIES_IN_A_PAGE,
        offset: (page + 1) * CATEGORIES_IN_A_PAGE,
        attributes: ["name"],
      };

      const { count, rows } = await db.Categories.findAndCountAll(options);
      let previousPageUrl;
      let nextPageUrl;

      if (page > Math.ceil(count / CATEGORIES_IN_A_PAGE)) {
        res.status(422).json({ error: "Invalid page" });
      }

      const URL_BASE = `${req.protocol}://${req.get("host")}${
        req.originalUrl
      }?page=`;

      if (page === 0) {
        previousPageUrl = null;
      } else {
        previousPageUrl = `${URL_BASE}${page - 1}`;
      }

      if (page === Math.ceil(count / CATEGORIES_IN_A_PAGE)) {
        nextPageUrl = null;
      } else {
        nextPageUrl += `${URL_BASE}${page + 1}`;
      }

      res.json({
        data: {
          count,
          categories: rows,
          previousPageUrl,
          nextPageUrl,
        },
      });
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
        res.status(404).json({ error: "Category not found" });
      }
      const isDeleted = await db.Categories.destroy({ where: { id } });
      if (!isDeleted) {
        res.status(500).json({ error: "Category could not be deleted" });
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
