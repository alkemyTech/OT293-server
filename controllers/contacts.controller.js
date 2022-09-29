const db = require('../models/index');

class ContactsController {
  static async findAll(req, res, next) {
    try {
      const contacts = await db.Contact.findAll();
      res.json(contacts);
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
module.exports = ContactsController;
