const db = require('../models/index');
const Jwt = require('../utils/jwt');

class UserController {
  constructor() { }

  // Get all user
  // Method: GET
  static async getUsers(req, res) { }

  // Get User by id
  // Method: GET
  static async getUserById(req, res) { }

  // Create new User
  // Method: POST
  static async createUser(req, res, next) {
    try {
      const token = await Jwt.tokenSign({ ...req.body });
      res.json({ data: { token } });
    } catch (e) {
      next(e);
    }
  }

  // Update all User data
  // Method: PUT
  static async updateUser(req, res) { }

  // Partially update User data
  // Method: PATCH
  static async partialUpdateUser(req, res) { }

  // Delete User from DB
  // Method: DELETE
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const deletedUser = await db.User.destroy({
        where: {
          id,
        },
      });

      res.json({ data: { id: deletedUser } });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
