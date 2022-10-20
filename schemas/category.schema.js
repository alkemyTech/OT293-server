const createCategorySchema = {
  name: {
    in: "body",
    trim: true,
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isString: {
      errorMessage: "It must be a string",
    },
  },
  description: {
    in: "body",
    trim: true,
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isString: {
      errorMessage: "It must be a string",
    },
  },
  image: {
    in: "body",
    trim: true,
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isURL: {
      errorMessage: "It must be an url",
    },
  },
};

const updateCategorySchema = {
  name: {
    in: "body",
    optional: true,
    trim: true,
    isString: {
      errorMessage: "It must be a string",
    },
  },
  description: {
    in: "body",
    optional: true,
    trim: true,
    isString: {
      errorMessage: "It must be a string",
    },
  },
  image: {
    in: "body",
    optional: true,
    trim: true,
    isURL: {
      errorMessage: "It must be an url",
    },
  },
};

module.exports = {
  updateCategorySchema,
  createCategorySchema,
};
