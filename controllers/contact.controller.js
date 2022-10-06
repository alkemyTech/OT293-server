'use strict';

const db = require('../models');

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