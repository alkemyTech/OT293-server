const bcrypt = require('bcrypt');

const Jwt = require('../utils/jwt');

// Models
const db = require('../models/index');

class AuthService {
  static async login(data) {
    const user = await this.validateLoginData(data);
    const token = await Jwt.signToken(user);
    return token;
  }

  static async validateLoginData(data) {
    const { email, password } = data;
    const user = await this.getUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('wrong email or password');
    }
    return user;
  }

  static async getUserByEmail(email) {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('wrong email or password');
    }
    return user;
  }
}

module.exports = AuthService;
