'use strict';

const db = require('../models/index');
class NewController {

  constructor() {

  }

  /**
   * List of resources
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   */

  static async findAll(req, res) {

  }

  /**
   * Find one resource
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   */

  static async findOne(req, res) {
  }

  /**
   * Store a resource in database
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   */

  static async store(req, res) {

  }

  /**
   * Update a resourse from the database
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   */

  static async update(req, res, next) {
    const { id } = req.params;
    const changes = req.body;
    try {
      const findNew = await db.New.findByPk(id)
      if(!findNew) res.status(404).json({data: 'New Not Found'});
    } catch (error) {
      next(error)
    }
  }

  /**
   * Delete a resource from the database
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   */

  static async delete(req, res) {

  }

}

module.exports = NewController;