const db = require("../models/index");
const { decodeImage } = require("../services/image");
const uploadImage = require("../helpers/uploadImage");

class SlidesController {
  static async findAll(req, res, next) {
    try {
      const slides = await db.Slide.findAll({
        attributes: ["order", "imageUrl"],
      });
      res.json({ data: slides });
    } catch (e) {
      next(e);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;

      const slide = await db.Slide.findByPk(id);

      if (!slide) {
        return res.status(404).json({ message: "Slide not found" });
      }

      res.json({ data: slide });
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const { imageUrl, text, organizationId } = req.body;
      let { order } = req.body;
      let imageInfo = decodeImage(imageUrl);

      let imageUri = await uploadImage(imageInfo.datos);
      if (!order) {
        order = await db.Slide.count({
          where: {
            organizationId,
          },
        });
        order++;
      }
      const newSlide = await db.Slide.create({
        imageUri,
        text,
        order,
        organizationId,
      });
      newSlide.save();
      return res.status(201).json(newSlide);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;

      const slide = await db.Slide.findByPk(id);
      if (!slide) {
        res.status(404).json({ error: "Slide Not Found" });
      }
      await slide.update(body);
      res.json(slide);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const slide = await db.Slide.findOne({ where: { id } });

      if (!slide) {
        return res.status(404).json({ message: "Slide not found" });
      }
      const isDeleted = await db.Slide.destroy({ where: { id } });
      if (!isDeleted) {
        return res.status(500).json({ error: "Slide could not be deleted" });
      }
      res.json({
        data: {
          id,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = SlidesController;
