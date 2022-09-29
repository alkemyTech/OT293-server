const db = require('../models/index');

class CategoriesController {

  static async findAll(req, res, next) {

    try {
      const categories = await db.Categories.findAll({
        attributes: ['name']
      });

      res.json({data: categories});

    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {
       try {
            const { id } = req.params;
            const category = await db.Categories.findOne(
                {
                    where: { id },
                    include: {
                        attributes: ['name', 'description', 'image'],
                        through: { attributes: [] }
                    }
                }
            );

            if (!category) {
                return res.status(404).json({message: 'Category not found'});
            } else {
                return res.status(200).json(category);
            }
            
        } catch (error) {
            console.log(error.message)
        }

    }

  }

  static async create(req, res, next) {
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

  static async update(req, res, next) {

  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const category = await db.Categories.findOne({ where: { id } });
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
      }
      const isDeleted = await db.Categories.destroy({ where: { id } });
      if (!isDeleted) {
        res.status(500).json({ error: 'Category could not be deleted' });
      }
      res.json({
        data: {
          message: 'Category has been deleted correctly',
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CategoriesController;
