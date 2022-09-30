const express = require("express");

const CategoriesController = require("../controllers/categories.controller");
const auth = require("../middlewares/auth");
const verifyAdmin = require("../middlewares/admin");

const router = express.Router();

router.get("/", auth, verifyAdmin, CategoriesController.findAll);
router.delete("/:id/", verifyAdmin, CategoriesController.delete);
router.get("/categories/:id", verifyAdmin, CategoriesController.findOne);

module.exports = router;
