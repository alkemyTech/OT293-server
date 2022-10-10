const verifyUser = async (req, res, next) => {
  const { id } = req.params;
  const { sub } = req.user; // user ID from json web token

  if (sub !== Number(id)) {
    return res.status(403).json({ message: 'You are not authorized to access this resource' });
  }

  next();
};

module.exports = verifyUser;
