'use strict';
const New = require('../models/new');
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

  static async update(req, res) {

  }

  /**
   * Delete a resource from the database
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   */

  static async deleteNew(req, res) {
    try {
      const {id} = req.params;
  
      const deletedNew = await New.destroy({
        where: { id }
      });
  
      res.json({ data: { id: deletedNew } });   
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = NewController;