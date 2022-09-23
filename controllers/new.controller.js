const News = require('../models/new');

class NewController {
  constructor() {

  }

  /**
   * List of resources
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */

  static async findAll(req, res) {

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
      const newsDetail = await News.findByPk(id);
      res.status(200).json({ data: newsDetail });
    } catch (e) {
      res.status(400).json({ message: `${e.message}` });
    }
  }

  /**
   * Store a resource in database
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */

  static async store(req, res) {

  }

  /**
   * Update a resourse from the database
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */

  static async update(req, res) {

  }

  /**
   * Delete a resource from the database
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */

  static async delete(req, res) {

  }
}

module.exports = NewController;
