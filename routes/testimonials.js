const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/admin');
const TestimonialsController = require('../controllers/testimonials.controllers.js');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 * schemas:
 *  createTestimonial:
 *   type: object
 *   properties:
 *    name:
 *      type: string
 *      description: Name of the testimonial
 *    content:
 *      type: string
 *      description: Content of the testimonial
 *    required:
 *     - name
 *     - content
 *    example:
 *     id: 1
 *     name: John Doe
 *     content: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *   updateTestimonial:
 *    name:
 *      type: string
 *      description: New name of the testimonial
 *    content:
 *      type: string
 *      description: New content of the testimonial
 *    example:
 *     id: 1
 *     name: Jane Doe
 *     content: New description.
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
 * get:
 *  summary: Get all testimonials
 *    security:
 *    - bearerAuth: []
 *  tags: [Testimonials]
 * responses:
 *  200:
 *   description: The list of testimonials
 *    content:
 *     application/json:
 *     schema:
 *     type: array
 * 
 *  401:
 *   description: Unauthorized
 *    content:
 *      application/json:
 *      schema:
 *      type: object
 *      properties: 
 *        message:
 *        type: string
 *        example: Unauthorization. Please log in
 *  500:
 *   description: Internal server error
 */

router.get('/', 
  auth,
  TestimonialsController.findAll
);

/**
 * @swagger
 * /testimonials
 * post:
 *  summary: Create a testimonial
 *  security:
 *   - bearerAuth: []
 *  tags: [Testimonials]
 *  requestBody:
 *    required: true
 *   content:
 *   application/json:
 *   schema:
 *   type: object
 *   $ref: '#/components/schemas/createTestimonial'
 * responses:
 *   200:
 *    description: The testimonial was successfully created
 *    content:
 *     application/json:
 *     schema:
 *     type: object
 *     $ref: '#/components/schemas/createTestimonial'
 *   404:
 *    description: Not found
 *    content:
 *      application/json:
 *      schema:
 *      type: object
 *      properties: 
 *      message:
 *      type: string
 *      example: Name and content are required
 * 
 *   500:
 *    description: Internal server error
 */
router.post(
  '/', 
  auth,
  verifyAdmin, 
  TestimonialsController.create
)

/** 
 * @swagger
 * /testimonials/{id}:
 * put:
 * summary: Update a testimonial
 * security:
 * - bearerAuth: []
 * tags: [Testimonials]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *       type: integer
 *       required: true
 *       description: Id from the testimonial to update
 * responses:
 * 200:
 *    description: Successful request
 *     content:
 *      application/json:
 *      schema:
 *      type: object
 *      $ref: '#/components/schemas/updateTestimonial'
 * 401:
 *     description: Unauthorized
 *      content:
 *       application/json:
 *       schema:
 *       type: object
 *       properties: 
 *       message:
 *       type: string
 *       example: Unauthorization. Please log in
 * 403:
 *     description: Forbidden
 *      content:
 *       application/json:
 *       schema:
 *       type: object
 *       properties: 
 *       message:
 *       type: string
 *       example: You are not authorized to access this resource
 * 
 * 404:
 *    description: Not found
 *     content:
 *      application/json:
 *      schema:
 *      type: object
 *      properties: 
 *      message:
 *      type: string
 *      example: Testimonial not found
 * 500:
 *    description: Internal server error
*/
router.put(
  '/:id', 
  auth,
  verifyAdmin, 
  TestimonialsController.update
)

/**
 * @swagger
 * /testimonials/{id}:
 * delete:
 * summary: Delete a testimonial
 * security:
 * - bearerAuth: []
 * tags: [Testimonials]
 * 
 * parameters:
 * - in: path
 *  name: id
 *  schema:
 *  type: integer
 *  required: true
 *  description: Id from the testimonial to delete
 * 
 * responses:
 * 200:
 *    description: Successful request
 *     content:
 *      application/json:
 *      schema:
 *      type: object
 *      properties:
 *      message:
 *      type: string
 *      example: Testimonial eliminado correctamente
 * 401:
 *     description: Unauthorized
 *      content:
 *       application/json:
 *       schema:
 *       type: object
 *       properties: 
 *       message:
 *       type: string
 *       example: Unauthorization. Please log in
 * 403:
 *     description: Forbidden
 *      content:
 *       application/json:
 *       schema:
 *       type: object
 *       properties: 
 *       message:
 *       type: string
 *       example: You are not authorized to access this resource
 * 404:
 *    description: Not found
 *     content:
 *      application/json:
 *      schema:
 *      type: object
 *      properties: 
 *      message:
 *      type: string
 *      example: No existe un testimonial con ese ID
 * 500:
 *    description: Internal server error
 */

router.delete('/:id', 
  auth,
  verifyAdmin, 
  TestimonialsController.delete
);


module.exports = router;
