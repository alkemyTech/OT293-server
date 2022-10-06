const express = require('express');
const { checkSchema } = require('express-validator');

const SlidesController = require('../controllers/slides.controller');
const { dataValidator } = require('../middlewares/validator');
const { updateSlideSchema } = require('../schemas/slide.schema');
const verifyAdmin = require('../middlewares/admin');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get("/", verifyAdmin, SlidesController.findAll);
router.get("/:id", auth, verifyAdmin, SlidesController.findOne);

router.put(
  '/:id',
  verifyAdmin,
  checkSchema(updateSlideSchema),
  dataValidator,
  SlidesController.update,
);

router.delete('/:id', verifyAdmin, SlidesController.delete);

module.exports = router;
