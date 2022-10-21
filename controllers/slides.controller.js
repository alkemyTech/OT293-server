const db = require('../models/index');
const { decodeImage } = require('../services/image');
const { uploadfile, getSignUrl } = require('../utils/s3');

class SlidesController {
  static async findAll(req, res, next) {
    try {
      const slides = await db.Slide.findAll({
        attributes: ['order', 'imageUrl'],
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
        return res.status(404).json({ message: 'Slide not found' });
      }

      res.json({ data: slide });
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const { file } = req.files;
      const { text, organizationId } = req.body;
      let { order } = req.body;

      if (!order) {
        order = await db.Slide.count({
          where: {
            organizationId,
          },
        });
        order++;
      }

      // Upload image to AWS S3
      uploadfile(file);

      const image = file.name;
      const newSlide = await db.Slide.create({
        image,
        text,
        order,
        organizationId,
      });

      // Get image url form AWS
      const imageUrl = await getSignUrl(image);

      return res.status(201).json({ ...newSlide.dataValues, image: imageUrl });
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
        return res.status(404).json({ error: 'Slide Not Found' });
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
        return res.status(404).json({ message: 'Slide not found' });
      }
      const isDeleted = await db.Slide.destroy({ where: { id } });
      if (!isDeleted) {
        return res.status(500).json({ error: 'Slide could not be deleted' });
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
