const express = require('express');
const { checkSchema } = require('express-validator');

const SlidesController = require('../controllers/slides.controller');
const { dataValidator } = require('../middlewares/validator');
const { updateSlideSchema } = require('../schemas/slide.schema');
const verifyAdmin = require('../middlewares/admin');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get(
  '/', 
  auth,
  verifyAdmin, 
  SlidesController.findAll
);

router.get(
  '/:id', 
  auth, 
  verifyAdmin, 
  SlidesController.findOne
);

router.put(
  '/:id',
  auth,
  verifyAdmin,
  checkSchema(updateSlideSchema),
  dataValidator,
  SlidesController.update,
);

router.delete(
  '/:id', 
  auth,
  verifyAdmin, 
  SlidesController.delete
);

router.post(
  '/', 
  auth,
  verifyAdmin, 
  SlidesController.create
);

module.exports = router;
