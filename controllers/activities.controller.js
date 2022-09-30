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
  static async createActivities(req, res) { 
    try {
      const { name, content, image } = req.body;
      if (!(name && content)) { return res.status(404).send("Name y Content obligatorios") };
      const container = await db.Activities.findOne({ where: { name: name.toLowerCase() } });
      if (!container) {
      const createActivity = await db.Activities.create({
        name: name.toLowerCase(),
        content,
        image
      });
      createActivity ? res.send(createActivity) : res.status(404).send('Ocurrió un error durante la creación');
    } else {
      res.status(404).send('Ya existe una actividad con ese nombre, pruebe con otro');
    }
    } catch (error) {
      console.log(error);
    }
  }

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
