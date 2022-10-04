/**
 * These schemas are used to validate data with express-validator,
 * The schemas are passed to the function checkSchema()
 */

const updateSlideSchema = {
  id: {
    in: "params",
    isInt: true,
    errorMessage: "ID is wrong",
  },
  order: {
    in: "body",
    optional: true,
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isString: {
      errorMessage: "It must be a string",
    },
    trim: true,
  },
  text: {
    in: "body",
    optional: true,
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isString: {
      errorMessage: "It must be a string",
    },
    trim: true,
  },
  imageUrl: {
    in: "body",
    optional: true,
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isURL: {
      errorMessage: "It must be an url",
    },
    trim: true,
  },
  organizationId: {
    in: "body",
    optional: true,
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isInt: {
      errorMessage: "It must be a Number",
    },
  },
};

module.exports = {
  updateSlideSchema,
};
