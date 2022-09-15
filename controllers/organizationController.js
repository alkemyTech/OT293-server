const db = require('../models/index');

class OrganizationController {
  static async findAll(req, res, next) {
    try {
      const organizations = await db.Organization.findAll({
        attributes: ['name', 'image', 'phone', 'address'],
      });
      res.json(organizations);
    } catch (e) {
      next(e);
    }
  }

  static async findOne(req, res, next) {

  }

  static async create(req, res, next) {

  }

  static async update(req, res, next) {

  }

  static async delete(req, res, next) {

  }
}

module.exports = OrganizationController;
