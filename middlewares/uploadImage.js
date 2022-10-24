const { uploadfile } = require('../utils/s3');

const uploadImage = async (req, res, next) => {
  try {
    if (req.files) {
      const { file } = req.files;

      // return filename with current date in milliseconds
      file.name = `${new Date().getTime()}-${file.name}`;
      
      uploadfile(file);
      req.body.image = file.name;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadImage };
