const db = require("../models/index");

class ActivitiesController {
  constructor() {}

  // Get all Activitiess
  // Method: GET
  static async findAll(req, res, next) {}

  // Get Activities by id
  // Method: GET
  static async findOne(req, res, next) {}

  // Create new Activities
  // Method: POST
  static async create(req, res, next) {
    try {
      const { name, content, image } = req.body;

      const container = await db.Activities.findOne({
        where: { name: name.toLowerCase() },
      });

      if (container) {
        return res.status(409).json({ message: "It already exists" });
      }

      const createActivity = await db.Activities.create({
        name: name.toLowerCase(),
        content,
        image,
      });

      res.status(201).json({ data: createActivity });
    } catch (error) {
      next(error);
    }
  }

  // Update all Activities data
  // Method: PUT
  static async update(req, res, next) {
    try {
      const { id } = req.params;

      const activity = await db.Activities.findByPk(id);

      if (!activity) {
        return res.status(404).json({
          message: "Activity does not exist",
        });
      }

      const updated = await activity.update(req.body);
      return res.status(200).json({ data: updated });
    } catch (e) {
      next(e);
    }
  }

  // Delete Activities from DB
  // Method: DELETE
  static async delete(req, res, next) {}
}

module.exports = ActivitiesController;
