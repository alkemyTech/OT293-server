const express = require("express");

const { checkSchema } = require("express-validator");

const {
  updateCategorySchema,
  createCategorySchema,
} = require("../schemas/category.schema");

const CategoriesController = require("../controllers/categories.controller");
const auth = require("../middlewares/auth");
const verifyAdmin = require("../middlewares/admin");
const { dataValidator } = require("../middlewares/validator");

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
 *     Get category:
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
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         name: Category 1
 *         image: https://myimage.com/photo.jpg
 *         description: Category
 *         updatedAt: 2017-07-21T17:32:28Z
 *         createdAt: 2017-07-21T17:32:28Z
 *
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
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      oneOf:
 *                        - $ref: '#/components/schemas/Get category'
 *                  pages:
 *                    type: integer
 *                    example: 6
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
router.get("/", auth, verifyAdmin, CategoriesController.findAll);

/**
 * @swagger
 * /categories/{id}:
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
 *                properties:
 *                  data:
 *                    type: object
 *                    $ref: '#/components/schemas/Get category'
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
router.get("/:id", auth, verifyAdmin, CategoriesController.findOne);

/**
 * @swagger
 * /categories:
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
 *             $ref: '#/components/schemas/Update category'
 *     responses:
 *       201:
 *         description: Successful request
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    $ref: '#/components/schemas/Get category'
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
  "/",
  auth,
  verifyAdmin,
  checkSchema(createCategorySchema),
  dataValidator,
  CategoriesController.create
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Create category'
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
 *                properties:
 *                  data:
 *                    type: object
 *                    $ref: '#/components/schemas/Get category'
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
router.put(
  "/:id",
  auth,
  verifyAdmin,
  checkSchema(updateCategorySchema),
  CategoriesController.update
);

/**
 * @swagger
 * /categories/{id}:
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
 *                  data:
 *                    type: integer
 *                    example: 1
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
router.delete("/:id", auth, verifyAdmin, CategoriesController.delete);

module.exports = router;
