'use strict'
const {Categories} = require('../models/categories.js')

class CategoriesController {

    static async findOne(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Categories.findOne(
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

module.exports = CategoriesController;