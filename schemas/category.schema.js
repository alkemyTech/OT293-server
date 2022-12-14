const getCategoriesByPage = {
  page: {
    in: 'query',
    optional: true,
    trim: true,
    isInt: {
      errorMessage: 'It must be an integer',
    },
  },
  size: {
    in: 'query',
    optional: true,
    trim: true,
    isInt: {
      errorMessage: 'It must be an integer',
    },
  },
};

const createCategorySchema = {
  name: {
    in: 'body',
    trim: true,
    notEmpty: {
      errorMessage: 'It must not be empty',
    },
    isString: {
      errorMessage: 'It must be a string',
    },
  },
  description: {
    in: 'body',
    trim: true,
    notEmpty: {
      errorMessage: 'It must not be empty',
    },
    isString: {
      errorMessage: 'It must be a string',
    },
  },
};

const updateCategorySchema = {
  name: {
    in: 'body',
    optional: true,
    trim: true,
    isString: {
      errorMessage: 'It must be a string',
    },
  },
  description: {
    in: 'body',
    optional: true,
    trim: true,
    isString: {
      errorMessage: 'It must be a string',
    },
  },
};

module.exports = {
  updateCategorySchema,
  createCategorySchema,
  getCategoriesByPage,
};
