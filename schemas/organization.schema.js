/**
 * These schemas are used to validate data with express-validator,
 * The schemas are passed to the function checkSchema()
 */

 const updateOrganizationSchema = {
  id: {
    in: ['params', 'query'],
    isInt: true,
    errorMessage: 'ID is wrong',
  },
  name: {
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
  welcomeText: {
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
  email: {
    in: "body",
    optional: true,
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isEmail: {
      errorMessage: "It must be a valid email",
    },
    trim: true,
  },
  image: {
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
  aboutText: {
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
  address: {
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
  phone: {
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
  updateOrganizationSchema,
};
