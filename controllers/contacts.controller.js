const db = require("../models/index");

class ContactsController {
  static async findAll(req, res, next) {
    try {
      const container = db.Contacts.findAll()
      if (container.length) {
        res.json({ data: container })
      } else {
        res.status(404).send("No existen contactos creados")
      }
    } catch (e) {
      next(e);
    }
  }

  static async findOne(req, res, next) {
    try {
       
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
     
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }

  }

  static async delete(req, res, next) {
    try {
    
    } catch (e) {
      next(e);
    }
  }
}


module.exports = ContactsController;