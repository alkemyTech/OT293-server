const db = require("../models/index");

class OrganizationController {
  static async findAll(req, res, next) {
    try {
      const organizations = await db.Organization.findAll({
        attributes: ["name", "image", "phone", "address"],
      });
      res.json(organizations);
    } catch (e) {
      next(e);
    }
  }

  static async findOne(req, res, next) {}

  static async create(req, res, next) {}

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;

      const organization = await db.Organization.findByPk(id);
      if (!organization) {
        res.status(404).json({ error: "Organization Not Found" });
      }
      await organization.update(body);
      res.json(organization);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {}
}

module.exports = OrganizationController;
