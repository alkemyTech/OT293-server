const db = require("../models/index");

class NewController {
  constructor() {}

  /**
   * List of resources
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */

  static async findAll(req, res) {}

  /**
   * Find one resource
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */

  static async findOne(req, res) {}

  /**
   * Store a resource in database
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */

  static async store(req, res, next) {
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

  static async update(req, res) {}

  /**
   * Delete a resource from the database
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */

  static async delete(req, res) {}
}

module.exports = NewController;
