const { uploadfile } = require('../utils/s3');

const uploadImage = async (req, res, next) => {
  try {
    if (req.files) {
      const { file } = req.files;
      uploadfile(file);
      req.body.image = file.name;
      next();
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadImage };
