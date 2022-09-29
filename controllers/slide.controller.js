'use strict';

const db = require('../models');

class SlideController {

  constructor() {

  }

  /**
   * List of resources
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   */

  static async findAll(req, res, next) {

  }

  /**
   * Find one resource
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   */

  static async findOne(req, res, next) {
    try {

      const { id } = req.params;

      const slide = await db.Slide.findByPk(id);

      if(!slide) {
        return res.status(404).json({message: 'Slide not found'});
      }

      res.json({data: slide});

    } catch (e) {
      next(e);
    }
  }

  /**
   * Store a resource in database
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   */

  static async store(req, res, next) {

  }

  /**
   * Update a resourse from the database
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   */

  static async update(req, res, next) {

  }

  /**
   * Delete a resource from the database
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   */

  static async delete(req, res, next) {

  }

}

module.exports = SlideController;