const AuthService = require('../services/auth.service');
const { uploadfile } = require('../utils/s3');

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
      const { file } = req.files;
      const { body } = req;

      // Upload image to s3
      uploadfile(file);

      const data = { ...body, image: file.name };
      const token = await AuthService.registerUser(data);
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
