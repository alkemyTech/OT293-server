const jwt = require('jsonwebtoken');

class Jwt {
  static async tokenSign(user) {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h',
      },
    );
  }

  static async verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return null;
    }
  }
}

module.exports = Jwt;
