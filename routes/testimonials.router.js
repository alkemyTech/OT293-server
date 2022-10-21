const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/admin');
const TestimonialsController = require('../controllers/testimonials.controller.js');
const auth = require('../middlewares/auth');
const { checkSchema } = require('express-validator');
const {
  createTestimonialSchema,
  updateTestimonialSchema,
} = require('../schemas/testimonial.schema');
const { dataValidator } = require('../middlewares/validator');
const { uploadImage } = require('../middlewares/uploadImage');

/**
 * @swagger
 * components:
 *   schemas:
 *     getTestimonial:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: testimonial's id
 *         name:
 *           type: string
 *           description: person who wrote the testimonial
 *         image:
 *           type: string
 *           description: testimonial's image
 *         content:
 *           type: string
 *           description: testimonial's content
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
 *         id: 1
 *         name: John Doe
 *         image: https://myimage.com/photo.jpg
 *         content: so good
 *         updatedAt: 2017-07-21T17:32:28Z
 *         createdAt: 2017-07-21T17:32:28Z
 *         deletedAt: null
 *     createTestimonial:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the testimonial
 *           example: John Doe
 *         image:
 *           type: string
 *           description: testimonial's image
 *           example: https://myimage.com/photo.jpg
 *         content:
 *           type: string
 *           description: Content of the testimonial
 *           example: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *       required:
 *         - name
 *         - image
 *         - content
 *     updateTestimonial:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: New name of the testimonial
 *           example: John Doe
 *         image:
 *           type: string
 *           description: testimonial's image
 *           example: https://myimage.com/photo.jpg
 *         content:
 *           type: string
 *           description: New content of the testimonial
 *           example: New description.
 *     securitySchemes:
 *       bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Testimonials
 *   description: Testimonials endpoint
 */

/**
 * @swagger
 * /testimonials:
 *   get:
 *     summary: Get all testimonials
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: number of page
 *     tags: [Testimonials]
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
 *                        - $ref: '#/components/schemas/getTestimonials'
 *                  totalPages:
 *                    type: integer
 *                    example: 6
 *                  previousPage:
 *                    type: string
 *                    example: https://mysite/testimonials?page=1
 *                  nextPage:
 *                    type: string
 *                    example: https://mysite/testimonials?page=2
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorization. Please log in
 *       500:
 *         description: Internal server error
 */

router.get('/', auth, TestimonialsController.findAll);

/**
 * @swagger
 * /testimonials:
 *   post:
 *     summary: Create a testimonial
 *     security:
 *       - bearerAuth: []
 *     tags: [Testimonials]
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Testimonial has been created
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    $ref: '#/components/schemas/getTestimonial'
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
  checkSchema(createTestimonialSchema),
  dataValidator,
  uploadImage,
  TestimonialsController.create
);

/**
 * @swagger
 * /testimonials/{id}:
 *   put:
 *     summary: Update a testimonial
 *     security:
 *       - bearerAuth: []
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id from the testimonial to update
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               content:
 *                 type: string
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
 *                    $ref: '#/components/schemas/getTestimonial'
 *       401:
 *         description: Unauthorized
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Unauthorization. Please log in
 *       403:
 *         description: Forbidden
 *         content:
 *            application/json:
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
 *       404:
 *         description: Not found
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Testimonial not found
 *       500:
 *         description: Internal server error
 */
router.put(
  '/:id',
  auth,
  verifyAdmin,
  checkSchema(updateTestimonialSchema),
  dataValidator,
  uploadImage,
  TestimonialsController.update
);

/**
 * @swagger
 * /testimonials/{id}:
 *    delete:
 *      summary: Delete a testimonial
 *      security:
 *        - bearerAuth: []
 *      tags: [Testimonials]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id from the testimonial to delete
 *
 *      responses:
 *        200:
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
 *                        description: new's id
 *        401:
 *          description: Unauthorized
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Unauthorization. Please log in
 *        403:
 *          description: Forbidden
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: You are not authorized to access this resource
 *        404:
 *          description: Not found
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: No existe un testimonial con ese ID
 *        500:
 *          description: Internal server error
 */

router.delete('/:id', auth, verifyAdmin, TestimonialsController.delete);

module.exports = router;
