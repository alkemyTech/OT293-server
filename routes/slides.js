const express = require("express");
const { checkSchema } = require("express-validator");

const SlidesController = require("../controllers/slides.controller");
const verifyAdmin = require("../middlewares/admin");
const { dataValidator } = require("../middlewares/validator");
const { updateSlideSchema } = require("../schemas/slide.schema");

const router = express.Router();

router.get("/:id", verifyAdmin, SlidesController.delete);
router.put(
  "/:id",
  verifyAdmin,
  checkSchema(updateSlideSchema),
  dataValidator,
  SlidesController.update
);

module.exports = router;
