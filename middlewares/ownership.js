'use strict';
require("dotenv").config();

const jwt = require('jsonwebtoken');
const {User} = require('../models/user');

const verifyUser = async (req, res, next) => {

    const token = req.headers["auth"];
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const user = await User.findById(decoded.id)

    if (user === 1) {
        next()
    } else if (!user) {
      return res.status(403).json({message: 'You are not authorized to access this resource'})
    }
}

module.exports = verifyUser;