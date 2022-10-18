const express = require('express');

const { checkSchema } = require('express-validator')

const { updateCategorySchema } = require('../schemas/category.schema');

const CategoriesController = require('../controllers/categories.controller');
const auth = require('../middlewares/auth');
const verifyAdmin = require('../middlewares/admin');

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Create category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: category's name
 *         image:
 *           type: string
 *           description: Category's photo (url)
 *         description:
 *           type: string
 *           description: description of Category
 *       required:
 *         - name
 *         - description
 *         - image
 *       example:
 *         id: 1
 *         name: Category 1
 *         image: https://myimage.com/photo.jpg
 *         description: Category
 *     Update category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: category's name
 *         image:
 *           type: string
 *           description: Category's photo (url)
 *         description:
 *           type: string
 *           description: description of Category
 *       example:
 *         id: 1
 *         name: Category 1.1
 *         image: https://myimage.com/photo.jpg
 *         description: Category 1.1
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Categories endpoint
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get Categories
 *     security:
 *       - bearerAuth: []
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successful request
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: You are not authorized to access this resource
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: Unauthorization. Please log in
 *       500:
 *         description: Internal server error
 */
router.get('/', 
    auth, 
    verifyAdmin, 
    CategoriesController.findAll
);

/**
 * @swagger
 * /categories/:id:
 *   get:
 *     summary: Get Category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the category to get
 *     security:
 *       - bearerAuth: []
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successful request
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Update category'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: Unauthorization. Please log in
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: You are not authorized to access this resource
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: Category not found
 *       500:
 *         description: Internal server error
 */
router.get(
    '/:id', 
    auth,
    verifyAdmin, 
    CategoriesController.findOne
);

/**
 * @swagger
 * /Categories:
 *   post:
 *     summary: Create category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Create category'
 *     responses:
 *       200:
 *         description: Successful request
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Update category'
 *       404:
 *         description: Name (req.body) Not Found
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: La categoría debe contener un nombre obligatoriamente
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: You are not authorized to access this resource
 *       500:
 *         description: Internal server error
 */
router.post(
    '/', 
    auth,
    verifyAdmin, 
    CategoriesController.create
);

/**
 * @swagger
 * /categories/:id:
 *   put:
 *     summary: Update Category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the category to update
 *     security:
 *       - bearerAuth: []
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successful request
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Update category'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: Unauthorization. Please log in
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: You are not authorized to access this resource
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: Category not found
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: Something is wrong with req.body
 *       500:
 *         description: Internal server error
 */
router.put('/:id', 
    auth,
    verifyAdmin,
    checkSchema(updateCategorySchema),
    CategoriesController.update
);

/**
 * @swagger
 * /categories/:id:
 *   delete:
 *     summary: Delete Category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the category to delete
 *     security:
 *       - bearerAuth: []
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successful request
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: Category has been deleted correctly
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: Unauthorization. Please log in
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: You are not authorized to access this resource
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: Category not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  message:
 *                    type: string
 *                    example: Category could not be deleted
 */
router.delete(
    '/:id', 
    auth,
    verifyAdmin, 
    CategoriesController.delete
);

module.exports = router;
