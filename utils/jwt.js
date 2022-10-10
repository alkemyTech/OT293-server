const jwt = require('jsonwebtoken');

class Jwt {
  static async signToken(user) {
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '2h',
      },
    );
    return token;
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
