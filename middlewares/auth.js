const Jwt = require('../utils/jwt');

const db = require('../models/index');

const auth = async (req, res, next) => {
  try {
    const bearerHeader = req.get('authorization'); // Returns: 'Bearer <token>'
    if (!bearerHeader) {
      return res.status(401).json({ message: 'Unauthorization. Please log in' });
    }
    const token = bearerHeader.split(' ').pop();
    const payload = await Jwt.verifyToken(token);

    const user = await db.User.findByPk(payload.sub, {
      attributes: ['id', 'roleId'],
    });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user.dataValues;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
