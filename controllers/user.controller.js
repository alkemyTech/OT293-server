const db = require('../models/index');
const Jwt = require('../utils/jwt');

class UserController {
  constructor() { }

  // Get all user
  // Method: GET
  static async getUsers(req, res, next) {
    try {
      const users = await db.User.findAll();
      res.json({ data: users });
    } catch (e) {
      next(e);
    }
  }

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

  static async getProfile(req, res) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ msg: 'Unauthorized' });

    try {
      const token = authorization.split(' ').pop();
      if (!token) {
        return res.status(401).json({ error: 'token missing or invalid' });
      }
      const decodedToken = Jwt.verifyToken(token);

      if (decodedToken === null) {
        return res
          .status(400)
          .json({ msg: 'Token missing or invalid.' });
      }
      const { id } = decodedToken;
      const userProfile = await db.User.findByPk(id);
      return res.status(200).json(userProfile);
    } catch (e) {
      return res.status(400).json({
        msg: `${e.message}`,
      });
    }
  }
}

module.exports = UserController;
