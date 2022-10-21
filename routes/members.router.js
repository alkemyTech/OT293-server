const express = require("express");

const auth = require("../middlewares/auth");
const verifyAdmin = require("../middlewares/admin");
const { checkSchema } = require("express-validator");
const {
  deleteMemberSchema,
  createMemberSchema,
} = require("../schemas/member.schema");
const { dataValidator } = require("../middlewares/validator");
const MemberController = require("../controllers/members.controller");

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
 *     Member:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           example: 10
 *         name:
 *           type: string
 *           example: Martin Perez
 *         facebookUrl:
 *           type: string
 *           example: fb.com/MartinPerez
 *         instagramUrl:
 *           type: string
 *           example: ig.com/MartinPerez
 *         linkedinUrl:
 *           type: string
 *           example: linkedin.com/MartinPerez
 *         image:
 *           type: string
 *           example: https://myimage.com/photo.jpg
 *         description:
 *           type: string
 *           example: I'm a memeber
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           example: null
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2017-07-21T17:32:28Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2017-07-21T17:32:28Z
 *     Member Request Post:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Martin Perez
 *         image:
 *           type: string
 *           example: https://myimage.com/photo.jpg
 *         facebookUrl:
 *           type: string
 *           example: https://fb.com/MartinPerez
 *         instagramUrl:
 *           type: string
 *           example: https://ig.com/MartinPerez
 *         linkedinUrl:
 *           type: string
 *           example: https://linkedin.com/MartinPerez
 *         description:
 *           type: string
 *           example: I'm a memeber
 *       required:
 *       - name
 *       - image
 *     Member Request Put:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Martin Perez
 *         image:
 *           type: string
 *           example: https://myimage.com/photo.jpg
 *         facebookUrl:
 *           type: string
 *           example: https://fb.com/MartinPerez
 *         instagramUrl:
 *           type: string
 *           example: https://ig.com/MartinPerez
 *         linkedinUrl:
 *           type: string
 *           example: https://linkedin.com/MartinPerez
 *         description:
 *           type: string
 *           example: I'm a memeber
 */

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Everything about ONG members endpoints
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     security:
 *       - bearerAuth: []
 *     tags: [Members]
 *     parameters:
 *     - name: page
 *       in: query
 *       description: Get members by page
 *       schema:
 *        type: integer
 *     operationId: findAllMembers
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
 *                        - $ref: '#/components/schemas/Member'
 *                  pages:
 *                    type: integer
 *                    example: 6
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
 *         description: Invalid page
 *       500:
 *         description: Internal server error
 */

router.get("/", auth, verifyAdmin, MemberController.findAll);

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Member Request Post'
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
 *                    $ref: '#/components/schemas/Member'
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
  checkSchema(createMemberSchema),
  dataValidator,
  MemberController.create
);

/**
 * @swagger
 * /members/:id:
 *   delete:
 *     summary: Delete a member
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         description: Admin token.
 *         schema:
 *          type: string
 *       - name: id
 *         in: path
 *         description: Member id
 *         required: true
 *         schema:
 *          type: integer
 *          example: 4
 *     security:
 *       - bearer_auth: []
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  deleted:
 *                    type: boolean
 *                    example: true
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
 *         description: Member not found
 *       500:
 *         description: Internal server error
 *
 */

router.delete(
  "/:id",
  auth,
  verifyAdmin,
  checkSchema(deleteMemberSchema),
  dataValidator,
  MemberController.deleteMember
);

/**
 * @swagger
 * /members/:id:
 *   put:
 *     summary: Update a member
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         description: Admin token
 *         schema:
 *          type: string
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *         description: Member ID
 *     security:
 *       - bearer_auth: []
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                 message:
 *                  type: string
 *                  example: Miembros actualizado con exito.
 *                 data:
 *                  type: string
 *                  example: [1, 4]
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
 *         description: Member Not Found
 *       500:
 *         description: Miembro no existe.
 */

router.put("/:id", verifyAdmin, MemberController.updateMember);

module.exports = router;
