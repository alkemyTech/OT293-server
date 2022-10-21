const express = require('express');

const auth = require('../middlewares/auth');
const verifyAdmin = require('../middlewares/admin');
const { checkSchema } = require('express-validator');
const {
  deleteMemberSchema,
  createMemberSchema,
  updateMemberSchema,
} = require('../schemas/member.schema');
const { dataValidator } = require('../middlewares/validator');
const MemberController = require('../controllers/members.controller');
const { uploadImage } = require('../middlewares/uploadImage');

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
 *                  totalPages:
 *                    type: integer
 *                    example: 6
 *                  previousPage:
 *                    type: string
 *                    example: https://mysite/members?page=1
 *                  nextPage:
 *                    type: string
 *                    example: https://mysite/members?page=2
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

router.get('/', auth, verifyAdmin, MemberController.findAll);

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               facebookUrl:
 *                 type: string
 *               instagramUrl:
 *                 type: string
 *               linkedinUrl:
 *                 type: string
 *               description:
 *                 type: string
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
  '/',
  auth,
  verifyAdmin,
  checkSchema(createMemberSchema),
  dataValidator,
  uploadImage,
  MemberController.create
);

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Delete a member
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *            required: true
 *            description: the member's id
 *     security:
 *       - bearerAuth: []
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                        description: member's id
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
 *         description: member not found
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
 *
 */

router.delete(
  '/:id',
  auth,
  verifyAdmin,
  checkSchema(deleteMemberSchema),
  dataValidator,
  MemberController.delete
);

/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Update a member
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *           required: true
 *           description: Member ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               facebookUrl:
 *                 type: string
 *               instagramUrl:
 *                 type: string
 *               linkedinUrl:
 *                 type: string
 *               description:
 *                 type: string
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: member updated
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
 *       404:
 *         description: member not found
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Not found
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

router.put(
  '/:id',
  auth,
  verifyAdmin,
  checkSchema(updateMemberSchema),
  dataValidator,
  uploadImage,
  MemberController.update
);

module.exports = router;
