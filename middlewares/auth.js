const Jwt = require('../utils/jwt');

const auth = async (req, res, next) => {
  try {
    const bearerAuth = req.get('authorization'); // Returns: 'Bearer <token>'
    if (!bearerAuth) {
      return res.status(401).json({ message: 'Unauthorization. Please log in' });
    }
    const token = bearerAuth.split(' ').pop();
    const user = await Jwt.verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
