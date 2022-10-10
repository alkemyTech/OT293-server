"use strict";

const verifyUser = async (req, res, next) => {
  const { id } = req.params;

  if (id !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You are not authorized to access this resource" });
  } 
  next();
};

module.exports = verifyUser;
