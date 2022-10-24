const db = require("../models/index");

const pagination = async (req, model) => {
  const size = 10;
  let { page = 1 } = req.query;

  page = Number.parseInt(page);

  const response = await db[model].findAndCountAll({
    limit: size,
    offset: (page - 1) * size,
    attributes: ["name", "description"],
  });

  const totalPages = Math.ceil(response.count / size);

  const { previousPage, nextPage } = buildUrls(req, totalPages);

  return { data: response.rows, totalPages, previousPage, nextPage };
};

const buildUrls = (req, totalPages) => {
  let { page = 1 } = req.query;

  page = Number.parseInt(page);

  let previousPage = null;
  let nextPage = null;

  const baseUrl =
    req.protocol + "://" + req.get("host") + req.originalUrl.split("?").shift();

  if (page > 1) {
    previousPage = baseUrl + `?page=${page - 1}`;
  }

  if (page < totalPages) {
    nextPage = baseUrl + `?page=${page + 1}`;
  }

  return { previousPage, nextPage };
};

module.exports = { pagination };
