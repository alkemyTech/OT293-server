/**
 * These schemas are used to validate data with express-validator,
 * The schemas are passed to the function checkSchema()
 */

const createNewSchema = {
  name: {
    in: "body",
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isString: {
      errorMessage: "It must be a string",
    },
    trim: true,
  },
  content: {
    in: "body",
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isString: {
      errorMessage: "It must be a string",
    },
  },
  categoryId: {
    in: "body",
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isInt: {
      errorMessage: "It must be a Number",
    },
  },
};

const updateNewSchema = {
  name: {
    in: "body",
    trim: true,
    optional: true,
    isString: {
      errorMessage: "It must be a string",
    },
  },
  content: {
    in: "body",
    trim: true,
    optional: true,
    isString: {
      errorMessage: "It must be a string",
    },
  },
  categoryId: {
    in: "body",
    optional: true,
    isInt: {
      errorMessage: "It must be a Number",
    },
  },
};

module.exports = {
  createNewSchema,
  updateNewSchema,
};
