const updateCategorySchema = {
    name: {
        in: 'body',
        optional: true,
        trim: true,
        isString: {
            errorMessage: 'It must be a string'
        }
    },
    description: {
        in: 'body',
        optional: true,
        trim: true,
        isString: {
            errorMessage: 'It must be a string'
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
}

module.exports = {
    updateCategorySchema
}