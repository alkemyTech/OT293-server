const express = require("express");
const { checkSchema } = require("express-validator");

const SlidesController = require("../controllers/slides.controller");
const verifyAdmin = require("../middlewares/admin");
const { dataValidator } = require("../middlewares/validator");
const { updateSlideSchema } = require("../schemas/slide.schema");

//Middlewares
const auth = require('../middlewares/auth');
const verifyAdmin = require('../middlewares/admin');
const SlideController = require('../controllers/slides.controller');
const router = express.Router();

router.get('/', verifyAdmin, SlidesController.findAll);
router.get('/:id', 
    auth,
    verifyAdmin,
    SlideController.findOne
);

router.delete('/:id', verifyAdmin, SlideController.delete);

module.exports = router;
