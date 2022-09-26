const db = require('../models/index');

class ActivitiesController {
  constructor() { }

  // Get all Activitiess
  // Method: GET
  static async getActivities(req, res) { }

  // Get Activities by id
  // Method: GET
  static async getActivitiesById(req, res) { }

  // Create new Activities
  // Method: POST
  static async createActivities(req, res) { }

  // Update all Activities data
  // Method: PUT
  static async updateActivities(req, res) {
    let activity = {};
    const { id } = req.params;
    const { name, content, image } = req.body;

    try {
      activity = await db.Activities.findByPk(id);
      if (!activity) {
        return res.status(400).json({
          msg: 'Activity does not exist',
        });
      }
      activity.name = name;
      activity.content = content;
      activity.image = image;
      const savedActivity = await activity.save();
      return res.status(200).json({
        msg: 'Activity was updated successfully',
        savedActivity,
      });
    } catch (e) {
      return res.status(400).json({
        msg: `${e.message}`,
      });
    }
  }

  // Partially update Activities data
  // Method: PATCH
  static async partialUpdateActivities(req, res) { }

  // Delete Activities from DB
  // Method: DELETE
  static async deleteActivities(req, res) { }
}

module.exports = ActivitiesController;
