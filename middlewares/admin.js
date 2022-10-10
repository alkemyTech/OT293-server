const verifyAdmin = async (req, res, next) => {
  const { role } = req.user;
  if (role === 1) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: 'You are not authorized to access this resource' });
  }
};

module.exports = verifyAdmin;
