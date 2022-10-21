const db = require("../models/index");

class ContactsController {
  static async findAll(req, res, next) {
    try {
      const container = db.Contacts.findAll();
      if (container.length) {
        res.json({ data: container });
      } else {
        res.status(404).send("No existen contactos creados");
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
      const createdContact = await db.Contacts.create(req.body);
      await sendMail(
        req.body.email,
        "thanks for contacting us!",
        welcomeEmail("ONG SOMOS MAS", "Thanks for contacting us", {
          mail: "ong@somos-mas.com",
          instagram: "somos_mas",
          facebook: "somos_mas",
          phone: 5445445,
        })
      );
      res.status(201).json({ data: createdContact });
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
