"use strict";

class uploadController {
  static async uploadfile(req, res, next) {
    res.send({ message: "file uploaded", ...req.files });
  }
}

module.exports = uploadController;
