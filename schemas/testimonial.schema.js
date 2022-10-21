const createTestimonialSchema = {
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
  image: {
    in: "body",
    optional: true,
    trim: true,
    isURL: {
      errorMessage: "It must be an url",
    },
  },
  content: {
    in: "body",
    optional: true,
    trim: true,
    isString: {
      errorMessage: "It must be a string",
    },
  },
};

const updateTestimonialSchema = {
  name: {
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
  content: {
    in: "body",
    optional: true,
    trim: true,
    isString: {
      errorMessage: "It must be a string",
    },
  },
};

module.exports = {
  createTestimonialSchema,
  updateTestimonialSchema,
};
