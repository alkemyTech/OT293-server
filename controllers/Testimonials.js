const db = require('../models/index')

const findAllTestimonials = async (req, res) => {
  try {
   
  } catch (error) {
    console.log(error);
  }
}

const findOneTestimonials = async (req, res) => {
  try {

    } catch (error) {
    console.log(error);
  }
}

const createTestimonials = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
  }
}

const updateTestimonials = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
  }
}

const deleteTestimonials = async (req, res) => {
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

module.exports = {
  deleteTestimonials
}