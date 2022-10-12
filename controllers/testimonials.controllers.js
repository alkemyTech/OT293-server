const db = require("../models/index");

class TestimonialsController {
  static async create(req, res, next) {
    try {
      const { name, content } = req.body;
      if (!name && !content) {
        return res
          .status(404)
          .json({ message: "Name and content are required" });
      }
      const existentTestimonial = await db.Testimonials.findOne({
        where: { name: name.toLowerCase() },
      });

      if (existentTestimonial) {
        res.status(404).json({ message: "Testimonial already exists" });
      } else {
        const newTestimonial = await db.Testimonials.create({
          name,
          content,
        })
        res.json(newTestimonial);
      }
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    let { page } = req.query;
    page = parseInt(page);
    if (!page) {
      page = 1;
    }
    const limitPage = 10;
    const offsetPage = 10 * (page - 1);
    const { count, rows } = await db.Testimonials.findAndCountAll({});
    const ultimaPagina = count % limitPage == 0 ? 0 : 1;
    const maxPage = Math.floor(count / 10) + ultimaPagina;

    const URL = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

    if (page > maxPage || page <= 0) {
      const response = {
        nextPage: null,
        items: [],
        previousPage: null,
      };
      res.status(404).json(response);
    } else {
      await db.Testimonials.findAll({
        limit: limitPage,
        offset: offsetPage,
      })
        .then((items) => {
          const response = {
            nextPage: page > maxPage ? null : `${URL}?page=${page++}`,
            items: items,
            previousPage: page == 1 ? null : `${URL}?page=${page--}`,
          };
          return res.status(200).json(response);
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    }
  }

  static async findOne(req, res, next) {}

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, content } = req.body;
      const testimonial = await db.Testimonials.findByPk(id);

      if (!testimonial) {
        res.status(404).json({ message: "Testimonial not found" });
      } else {
        const updatedTestimonial = await testimonial.set({
          name: name,
          content: content,
        });
        await updatedTestimonial.save();
        res.json(updatedTestimonial);
      }
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
