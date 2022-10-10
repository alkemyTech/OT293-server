'use strict';

const verifyAdmin = async (req, res, next) => {

    if (!req.user.roleId !== 1) {
        return res.status(403).json({message: 'You are not authorized to access this resource'});
    } 
    next();
}

module.exports = verifyAdmin;