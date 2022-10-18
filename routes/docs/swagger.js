const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = require("../../swaggerSpec.json")
const swaggerSpec = swaggerJSDoc(options);
const swaggerDocs = (app) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = {
    swaggerDocs
}