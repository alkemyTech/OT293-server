const db = require("../models/index");

const pagination = async (req, model) => {
  let { size = 10, page = 1 } = req.query;

  size = Number.parseInt(size);
  page = Number.parseInt(page);

  const response = await db[model].findAndCountAll({
    limit: size,
    offset: (page - 1) * size,
  });

  const totalPages = Math.ceil(response.count / size);

  return { data: response.rows, pages: totalPages };
};

module.exports = { pagination };
