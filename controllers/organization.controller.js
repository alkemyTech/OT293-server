const db = require("../models/index");

class OrganizationController {
  static async findAll(req, res, next) {
    try {
      const organizations = await db.Organization.findAll({
        attributes: [
          "name",
          "image",
          "phone",
          "address",
          "facebook_url",
          "linkedin_url",
          "instagram_url",
        ],
      });
      res.json({ data: organizations });
    } catch (e) {
      next(e);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const organization = await db.Organization.findByPk(id, {
        where: { id },
        include: "slides",
      });
      if (!organization) {
        res.status(404).json({ msg: "No existe Organizacion" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {}

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;

      const organization = await db.Organization.findByPk(id);
      if (!organization) {
        return res.status(404).json({ error: "Organization Not Found" });
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
