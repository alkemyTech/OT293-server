const verifyUser = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const role = req.user.roleId;

  if (role === 1) {
    next();
  } else if (userId === Number(id)) {
    next();
  } else {
    return res.status(403).json({ message: 'You are not authorized to access this resource' });
  }
};

module.exports = verifyUser;
