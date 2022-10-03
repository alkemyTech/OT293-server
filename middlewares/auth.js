'use strict';

const jwt = require('jsonwebtoken');
const db = require('../models');

/**
 * Verifies if the user is authenticated
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {callback} next 
 */

const auth = async (req, res, next) => {

  const token = req.get('Authorization');

  if (!token) {
    res.status(403).json({ message: 'Unauthenticated' });
    return;
  }

  try {

    const { user_id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.User.findByPk(user_id);

    if (!user.status) {
      return res.status(403).json({ message: 'Unauthenticated' });
    }

    req.user = user;

    next();

  } catch (error) {
    res.status(403).json({ message: 'Unauthenticated' });
  }
}

module.exports = auth;