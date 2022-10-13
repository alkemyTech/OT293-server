'use strict';

const db = require('../models');
const {sendMail} = require('../helpers/sendMail');
const welcomeEmail = require('../templates/welcomeEmail');

class ContactController {

  constructor() {

  }

  /**
   * List of resources
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   * @param {callback} next
   */

  static async findAll(req, res, next) {

  }

  /**
   * Find one resource
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   * @param {callback} next
   */

  static async findOne(req, res, next) {

  }

  /**
   * Store a resource in database
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   * @param {callback} next
   */

  static async store(req, res, next) {
    try {
      const createdContact = await db.Contacts.create(req.body);
      await sendMail(req.body.email, "thanks for contacting us!", welcomeEmail('ONG SOMOS MAS', 'Thanks for contacting us', {mail:'ong@somos-mas.com', instagram:'somos_mas', facebook:'somos_mas', phone: 5445445}));
      res.status(201).json({data: createdContact});
    } catch (e) {
      next(e)
    }
  }

  /**
   * Update a resourse from the database
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   * @param {callback} next
   */

  static async update(req, res, next) {

  }

  /**
   * Delete a resource from the database
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   * @param {callback} next
   */

  static async delete(req, res, next) {

  }

}

module.exports = ContactController;