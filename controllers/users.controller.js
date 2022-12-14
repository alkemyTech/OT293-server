const db = require("../models/index");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Jwt = require("../utils/jwt");

class UserController {
  constructor() {}

  // Get all user
  // Method: GET
  static async findAll(req, res, next) {
    try {
      const users = await db.User.findAll();
      res.json({ data: users });
    } catch (e) {
      next(e);
    }
  }

  // Get User by id
  // Method: GET
  static async findOne(req, res) {}

  // Create new User
  // Method: POST
  static async create(req, res, next) {
    try {
      const token = await Jwt.tokenSign({ ...req.body });
      res.json({ data: { token } });
    } catch (e) {
      next(e);
    }
  }

  // Partially update User data
  // Method: PATCH
  static async update(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (req.body.roleId && req.user.roleId == 2) {
        delete req.body.roleId;
      }

      const { id } = req.params;

      const user = await db.User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "Not found" });
      }

      // If request has password

      const { password } = req.body;

      if (password) {
        req.body.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await user.update(req.body);

      res.json({ data: updatedUser });
    } catch (e) {
      next(e);
    }
  }

  // Delete User from DB
  // Method: DELETE
  static async delete(req, res, next) {
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
