const express = require("express");
const { checkSchema } = require("express-validator");

const NewController = require("../controllers/news.controller");
const { createNewSchema } = require("../schemas/new.schema");
const { dataValidator } = require("../middlewares/validator");
const verifyAdmin = require("../middlewares/admin");
const auth = require("../middlewares/auth");

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
 *     Validation bad-request:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *                 example: It must not be empty
 *               param:
 *                 type: string
 *                 example: name
 *               location:
 *                 type: string
 *                 example: body
 *     Get new:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: new's id
 *         name:
 *           type: string
 *           description: name news
 *         content:
 *           type: text
 *           description: content news
 *         image:
 *           type: string
 *           description: image news
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 3
 *         name: News name
 *         content: Content of news
 *         image: https://image.com/photo.png
 *         categoryId: 1
 *         createdAt: 2017-07-21T17:32:28Z
 *         updatedAt: 2017-07-21T17:32:28Z
 *         deletedAt: null
 *     Create new:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: name news
 *         content:
 *           type: text
 *           description: content news
 *         image:
 *           type: string
 *           description: image news
 *         categoryId:
 *           type: integer
 *           description: category's id
 *       required:
 *         - name
 *         - content
 *         - image
 *         - categoryId
 *       example:
 *         name: News name
 *         content: Content of news
 *         image: https://image.com/photo.png
 *         categoryId: 1
 *     Update new:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: name news
 *         content:
 *           type: text
 *           description: content news
 *         image:
 *           type: string
 *           description: image news
 *         categoryId:
 *           type: integer
 *           description: category's id
 *       example:
 *         name: News name
 *         content: Content of news
 *         image: https://image.com/photo.png
 *         categoryId: 1
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get news
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           description: page size
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: number of page
 *     tags: [News]
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
 *                        - $ref: '#/components/schemas/Get new'
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
router.get("/", auth, verifyAdmin, NewController.findAll);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: return a news
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *            required: true
 *            description: the new's id
 *     responses:
 *       200:
 *         description: one news
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Get new'
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
 *       404:
 *         description: news not found
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Not found
 *       500:
 *         description: Internal server error
 */

router.get("/:id", auth, verifyAdmin, NewController.findOne);

/**
 * @swagger
 * /news/{id}/comments:
 *   get:
 *     summary: returns new's comments
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *            required: true
 *            description: the comment's id
 *     responses:
 *       200:
 *         description: OK - returns all comments
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Get new'
 *       404:
 *         description: new not found
 *       500:
 *         description: Internal server error
 */

router.get("/:id/comments", auth, NewController.findComments);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: create a new news
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Create new'
 *     responses:
 *       201:
 *         description: News has been created
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    $ref: '#/components/schemas/Get new'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Validation bad-request'
 *       500:
 *         description: Internal server error
 */

router.post(
  "/",
  auth,
  verifyAdmin,
  checkSchema(createNewSchema),
  dataValidator,
  NewController.create
);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: update a news
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: the news id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Update new'
 *     responses:
 *       200:
 *         description: news has been updated
 *       404:
 *         description: news not found
 */

router.put("/:id", auth, verifyAdmin, NewController.update);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: delete a news
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *            required: true
 *            description: the news id
 *     responses:
 *       200:
 *         description: news has been deleted
 *       404:
 *         description: news not found
 *       500:
 *         description: Internal server error
 */

router.delete("/:id", auth, verifyAdmin, NewController.delete);

module.exports = router;
