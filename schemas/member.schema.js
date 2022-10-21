/**
 * These schemas are used to validate data with express-validator,
 * The schemas are passed to the function checkSchema()
 */

const createMemberSchema = {
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
  facebookUrl: {
    in: "body",
    optional: true,
    trim: true,
    isURL: {
      errorMessage: "It must be a valid url",
    },
  },
  instagramUrl: {
    in: "body",
    optional: true,
    trim: true,
    isURL: {
      errorMessage: "It must be a valid url",
    },
  },
  linkedinUrl: {
    in: "body",
    optional: true,
    trim: true,
    isURL: {
      errorMessage: "It must be a valid url",
    },
  },
  image: {
    in: "body",
    trim: true,
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isURL: {
      errorMessage: "It must be a valid url",
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
};

const deleteMemberSchema = {
  id: {
    in: "params",
    isInt: true,
    errorMessage: "ID is wrong",
  },
};

module.exports = {
  deleteMemberSchema,
  createMemberSchema,
};
