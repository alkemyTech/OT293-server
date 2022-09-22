/**
 * These schemas are used to validate data with express-validator,
 * The schemas are passed to the function checkSchema()
 */

const updateUserSchema = {
    firstName: {
        in: 'body',
        optional: true,
        trim: true,
        isString: {
            errorMessage: 'It must be a string'
        }
    },
    lastName: {
        in: 'body',
        optional: true,
        trim: true,
        isString: {
            errorMessage: 'It must be a string'
        }
    },
    email: {
        in: 'body',
        optional: true,
        trim: true,
        isEmail: {
            errorMessage: 'It must be a valid email',
        }
    },
    image: {
        in: 'body',
        optional: true,
        trim: true,
        isURL: {
            errorMessage: 'It must be an url'
        }
    },
    password: {
        in: 'body',
        trim: true,
        optional: true,
        isString: {
            errorMessage: 'It must be a string'
        },
    },
}

module.exports = {
    updateUserSchema
}