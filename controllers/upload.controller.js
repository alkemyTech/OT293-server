const { uploadfile } = require("../utils/s3");

class uploadController {
  // method to upload files to s3
  static async uploadfile(req, res, next) {
    try {
      const result = await uploadfile(req.files.file);
      res.send({ result });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = uploadController;
