const { pagination } = require("../helpers/pagination");
const db = require("../models/index");

class NewController {
  constructor() {}

  /**
   * List of resources
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {callback} next
   */

  static async findAll(req, res, next) {
    try {
      const page = await pagination(req, "New");
      res.json(page);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Find one resource
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */

  static async findOne(req, res) {
    const { id } = req.params;
    try {
      const newsDetail = await db.New.findByPk(id);
      res.status(200).json({ data: newsDetail });
    } catch (e) {
      res.status(400).json({ message: `${e.message}` });
    }
  }

  /**
   * Find all comment of a new
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {callback} next
   */

  static async findComments(req, res, next) {
    try {
      const { id } = req.params;

      const post = await db.New.findByPk(id, {
        include: ["comments"],
      });

      if (!post) {
        return res.status(404).json({ message: "New not found" });
      }

      res.json({ data: post.comments });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Store a resource in database
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */

  static async create(req, res, next) {
    try {
      const { body } = req;
      const newNews = await db.New.create(body);
      res.status(201).json(newNews);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Update a resourse from the database
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */

  static async update(req, res, next) {
    const { id } = req.params;
    const changes = req.body;
    try {
      const findNew = await db.New.findByPk(id);
      if (!findNew) res.status(404).json({ data: "New Not Found" });
      const updateNew = await findNew.update(changes);
      delete updateNew.dataValues.deletedAt; // Elimina el envio de cuando fue eliminado al cliente.
      res
        .status(200)
        .json({ msg: "Novedad Actualizada con exito", data: updateNew });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a resource from the database
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */

  static async delete(req, res) {
    try {
      const { id } = req.params;

      const deletedNew = await db.New.destroy({
        where: { id },
      });

      res.json({ data: { id: deletedNew } });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = NewController;