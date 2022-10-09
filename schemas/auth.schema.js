/**
 * These schemas are used to validate data with express-validator,
 * The schemas are passed to the function checkSchema()
 */

const loginSchema = {
  email: {
    in: "body",
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isEmail: {
      errorMessage: "It must be a valid email",
    },
    trim: true,
  },
  password: {
    in: "body",
    isLength: {
      errorMessage: "Password should be at least 7 chars long",
      options: { min: 5 },
    },
  },
};

module.exports = {
  loginSchema,
};
