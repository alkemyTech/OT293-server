const express = require("express");
const { checkSchema } = require("express-validator");

const AuthController = require("../controllers/auth.controller");
const { loginSchema, registerSchema } = require("../schemas/auth.schema");
const { dataValidator } = require("../middlewares/validator");
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
 *     Register user:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: user's email
 *         password:
 *           type: string
 *           format: password
 *           description: user's password (it'll be hashed)
 *         image:
 *           type: string
 *           description: user's profile photo (url)
 *         firstName:
 *           type: string
 *           description: user's first name
 *         lastName:
 *           type: string
 *           description: user's last name
 *       required:
 *         - email
 *         - password
 *         - image
 *         - firstName
 *         - lastName
 *       example:
 *         email: email@email.com
 *         password: 1a2s23d4gf5
 *         image: https://myimage.com/photo.jpg
 *         firstName: Jeicob
 *         lastName: Miller
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: user's email
 *         password:
 *           type: string
 *           format: password
 *           description: user's password
 *       required:
 *         - email
 *         - password
 *       example:
 *         email: email@email.com
 *         password: 1a2s23d4gf5
 *     Profile:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: user's first name
 *         lastName:
 *           type: string
 *           description: user's last name
 *         image:
 *           type: string
 *           description: user's profile photo (url)
 *         email:
 *           type: string
 *           description: user's email
 *       example:
 *         firstName: Jeicob
 *         lastName: Miller
 *         image: https://myimage.com/photo.jpg
 *         email: email@email.com
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth endpoint
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a user on the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Register user'
 *     responses:
 *       200:
 *         description: User has been registered
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    description: 'JWT token'
 *       400:
 *         description: Bad requrest
 *       500:
 *         description: Internal server error
 */
router.post(
  "/register",
  checkSchema(registerSchema),
  dataValidator,
  AuthController.register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user on the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User has been logged
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    description: 'JWT token'
 *       400:
 *         description: Bad requrest
 *       500:
 *         description: Internal server error
 */
router.post(
  "/login",
  checkSchema(loginSchema),
  dataValidator,
  AuthController.login
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get logged user's data
 *     security:
 *       - bearerAuth: []
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful request
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Profile'
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
router.get("/me", auth, AuthController.getProfile);

module.exports = router;
