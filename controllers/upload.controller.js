const { uploadfile, getSignUrl } = require('../utils/s3');

class uploadController {
  // method to upload files to s3
  static async uploadfile(req, res, next) {
    try {
      const { file } = req.files;
      await uploadfile(file);
      const url = await getSignUrl(file);
      res.send({ url });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = uploadController;
