const express = require("express");
const { checkSchema } = require("express-validator");

const NewController = require("../controllers/new.controller");
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
 *     News:
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
 *       required:
 *         - name
 *         - content
 *         - image
 *       example:
 *         id: 3
 *         name: News name
 *         content: Content of news
 *         image: https://image.com/photo.png
 */

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
 *            description: the news id
 *     responses:
 *       200:
 *         description: one news
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/News'
 *       404:
 *         description: news not found
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
 *                $ref: '#/components/schemas/News'
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
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: News has been created
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/News'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post(
  "/",
  auth,
  verifyAdmin,
  checkSchema(createNewSchema),
  dataValidator,
  NewController.store
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
 *             $ref: '#/components/schemas/News'
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
