const express = require('express');
const auth = require("../middlewares/auth");
const verifyAdmin = require('../middlewares/admin');
const { checkSchema } = require("express-validator");
const { deleteMemberSchema } = require("../schemas/member.schema");
const { dataValidator } = require("../middlewares/validator");
const MemberController = require("../controllers/members.controller");
 
const router = express.Router();
 
/**
 * @swagger
 * components:
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
 *         image:
 *           type: string
 *         facebookUrl:
 *           type: string
 *           example: fb.com/MartinPerez
 *         instagramUrl:
 *           type: string
 *           example: ig.com/MartinPerez
 *         linkedinUrl:
 *           type: string
 *           example: linkedin.com/MartinPerez
 *       required:
 *       - id
 *       - name
 *       - image
 *     Member Request Post:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Martin Perez
 *         image:
 *           type: string
 *         facebookUrl:
 *           type: string
 *           example: fb.com/MartinPerez
 *         instagramUrl:
 *           type: string
 *           example: ig.com/MartinPerez
 *         linkedinUrl:
 *           type: string
 *           example: linkedin.com/MartinPerez
 *       required:
 *       - name
 *       - image
 *     requestBodies:
 *      Member:
 *       description: Member Object
 *       content:
 *        aplication/json:
 *         schema:
 *          $ref:#/components/schemas/Member
 *     securitySchemes:
 *       bearer_auth:
 *        type: http
 *        schema: bearer
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
 *       - bearer_auth: []
 *     tags: [Members]
 *     parameters:
 *     - name: token
 *       in: header
 *       required: true
 *       description: Admin token.
 *       schema:
 *        type: string
 *     - name: page
 *       in: query
 *       description: Get members by page
 *       schema:
 *        type: integer
 *     operationId: findAllMembers
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  count:
 *                    type: integer
 *                    example: 123 
 *                  rows:
 *                    type: array
 *                    items:
 *                     $ref: "#/components/schemas/Member"
 *                  previousPageUrl:
 *                    type: string
 *                  nextPageUrl:
 *                    type: string
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
 
router.get('/',
  auth,
  verifyAdmin,
  MemberController.getMembers
);
 
/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     security:
 *       - bearer_auth: []
 *     parameters:
 *       -  name: token
 *          in: header
 *          required: true
 *          description: Admin token
 *          schema:
 *           type: string
 *     requestBody:
 *       description: Update and existent member
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Member Request Post'
 *     responses:
 *       200:
 *         description: Miembro creado correctamente
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
 *         description: Campos obligatorios.
 *       500:
 *         description: Internal server error
 */
 
router.post('/',
  auth,
  verifyAdmin,
  MemberController.createMember
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
 
router.put('/:id', verifyAdmin, MemberController.updateMember);
 
 
module.exports = router;