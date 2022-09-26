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
    // aca agregar el update por id
  }

  // Partially update Activities data
  // Method: PATCH
  static async partialUpdateActivities(req, res) { }

  // Delete Activities from DB
  // Method: DELETE
  static async deleteActivities(req, res) { }
}

module.exports = ActivitiesController;
