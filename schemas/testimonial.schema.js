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
