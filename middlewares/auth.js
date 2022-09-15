'use strict';

/**
 * Verifies if the user is authenticated
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {callback} next 
 */

function auth(req, res, next) {

  const token = req.get('Authorization');

  if(!token) {
    res.status(403).json({message: 'Unauthenticated'});
    return;
  }

  next();
}

module.exports = auth;