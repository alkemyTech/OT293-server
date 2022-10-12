const AuthService = require('../services/auth.service');

class AuthController {
  // Returns token with user's information
  static async login(req, res, next) {
    try {
      const { body } = req;
      const token = await AuthService.login(body);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }

  // Returns token with new user's information
  static async register(req, res, next) {
    try {
      const { body } = req;
      const token = await AuthService.registerUser(body);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }

  // Returns the information of the authenticated user
  static async getProfile(req, res, next) {
    try {
      const { user } = req;
      const userData = await AuthService.getUserById(user.id);
      res.json({ userData });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
