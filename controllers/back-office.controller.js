const db = require("../models/index");

class BackOfficeController {
  static async findAllContacts(req, res, next) {
    try {
      const contacts = await db.Contacts.findAll();
      res.json({ data: contacts });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = BackOfficeController;
