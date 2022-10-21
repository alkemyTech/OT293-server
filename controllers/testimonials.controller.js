const { pagination } = require("../helpers/pagination");
const { getSignUrl } = require('../utils/s3');

const db = require("../models/index");

class TestimonialsController {
  static async create(req, res, next) {
    try {
      const { name, content, image } = req.body;

      const [testimonial, created] = await db.Testimonials.findOrCreate({
        where: { name },
        defaults: {
          name,
          content,
          image,
        },
      });

      if (created) {
        //Get image url from aws
        const imageUrl = await getSignUrl(image);
        return res
          .status(201)
          .json({ data: { ...testimonial.dataValues, image: imageUrl } });
      } else {
        return res
          .status(400)
          .json({ message: `Testimonial: ${name} already exists` });
      }
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const testimonials = await pagination(req, "Testimonials");
      res.json(testimonials);
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {}

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const testimonial = await db.Testimonials.findByPk(id);

      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }

      const updatedTestimonial = await testimonial.update(req.body);

      //Get image url from aws
      const imageUrl = await getSignUrl(updatedTestimonial.dataValues.image);

      res.json({ data: { ...updatedTestimonial.dataValues, image: imageUrl } });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const container = await db.Testimonials.findOne({ where: { id: id } });
      if (container) {
        await db.Testimonials.destroy({ where: { id: id } });
        res.json({ data: { id: Number.parseInt(id) } });
      } else {
        res
          .status(404)
          .json({ message: "No existe un testimonial con ese ID" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TestimonialsController;
