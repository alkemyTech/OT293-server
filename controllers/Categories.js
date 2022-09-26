const db = require('../models/index')

const createCategory = async (req, res) => {
  try {
    // Obtener información.
    const { name, description, image } = req.body;
    console.log("le llega: ", req.body)
    // Validar name
    if (!name) { res.status(404).send("La categoría debe contener un nombre obligatoriamente") };

    //  Buscar categoría
    const container = await db.Categories.findOne({ where: { name: name.toLowerCase() } });

    // Si no existe el nombre, crear categoría
    if (!container) {
      const newCategory = await db.Categories.create({  
          name: name.toLowerCase(),
          description,
          image
       })
       res.send("Categoría creada correctamente!")
    } else {
    // Si existe el nombre
      res.status(404).send("Ya existe una categoría con ese nombre, intente con otra.")
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
    createCategory
  }