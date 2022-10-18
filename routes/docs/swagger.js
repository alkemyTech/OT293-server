const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Alkemy OT293',
      version: '1.0.0',
    },
  },
  apis: ['routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
const swaggerDocs = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = {
  swaggerDocs,
};
