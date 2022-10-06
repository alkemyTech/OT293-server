const createContactSchema = {
    name: {
        in: 'body',
        trim: true,
        notEmpty: {
            errorMessage: 'It is required'
        },
        isString: {
            errorMessage: 'It must be a string'
        }
    },
    email: {
        in: 'body',
        trim: true,
        notEmpty: {
            errorMessage: 'It is required'
        },
        isEmail: {
            errorMessage: 'It must be a valid email'
        }
    },
}

module.exports = {
    createContactSchema
}