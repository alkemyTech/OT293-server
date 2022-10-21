const createCommentSchema = {
  body: {
    in: "body",
    trim: true,
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isString: {
      errorMessage: "It must be an integer",
    },
  },
  newsId: {
    in: "body",
    trim: true,
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isInt: {
      errorMessage: "It must be an integer",
    },
  },
  newsId: {
    in: "body",
    trim: true,
    notEmpty: {
      errorMessage: "It must not be empty",
    },
    isInt: {
      errorMessage: "It must be an integer",
    },
  },
};

module.exports = {
  createCommentSchema,
};
