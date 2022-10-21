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

      if (!newsDetail) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json({ data: newsDetail });
    } catch (e) {
      next(e);
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
      res.status(201).json({ data: newNews });
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

      if (!findNew) {
        return res.status(404).json({ message: "New Not Found" });
      }

      const updateNew = await findNew.update(changes);

      res.status(200).json({ data: updateNew });
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
      next(err);
    }
  }
}

module.exports = NewController;
