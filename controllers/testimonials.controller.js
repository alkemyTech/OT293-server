const { pagination } = require("../helpers/pagination");
const db = require("../models/index");

class TestimonialsController {
  static async create(req, res, next) {
    try {
      const { name } = req.body;

      const existentTestimonial = await db.Testimonials.findOne({
        where: { name: name.toLowerCase() },
      });

      if (existentTestimonial) {
        return res.status(404).json({ message: "Testimonial already exists" });
      }

      const newTestimonial = await db.Testimonials.create(req.body);

      res.status(201).json({ data: newTestimonial });
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
      res.json({ data: updatedTestimonial });
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
        res.send("Testimonial eliminado correctamente");
      } else {
        res.status(404).send("No existe un testimonial con ese ID");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TestimonialsController;
