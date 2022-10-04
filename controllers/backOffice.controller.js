const db = require('../models/index');

class BackOfficeController {
  static async findAllContacts(req, res, next) {
    try {
      const contacts = await db.Contact.findAll();
      res.json(contacts);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = BackOfficeController;
