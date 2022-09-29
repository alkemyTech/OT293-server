const express = require("express");

const router = express.Router();

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  res.json({ id });
});

module.exports = router;
