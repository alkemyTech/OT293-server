'use strict';
const {User} = require('../models/user');

const verifyAdmin = async (req, res, next) => {
    const user = await User.findById(req.roleId)
    if (user === 1) {
       next()
    } else {
        return res.status(403).json({message: 'You are not authorized to access this resource'})
    }
}

module.exports = verifyAdmin;