'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Activities', [
        {
        name: 'Apoyo Escolar para el nivel Primario',
        content: 'El espacio de apoyo escolar es el corazón del área educativa. Se realizan los \n\
        talleres de lunes a jueves de 10 a 12 horas y de 14 a 16 horas en el \n\
        contraturno.',
        image: 'https://static.guiainfantil.com/uploads/educacion/apoyoescolar-p.jpg',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'Apoyo Escolar Nivel Secundaria',
        content: 'Del mismo modo que en primaria, este taller es el corazón del área\n\
        secundaria. Se realizan talleres de lunes a viernes de 10 a 12 horas y de 16 a\n\
        18 horas en el contraturno.',
        image: 'https://www.junin.gob.ar/sites/default/files/noticias/resized_clases_de_apoyo_escolar.jpg',
        createdAt: new Date,
        updatedAt: new Date
      }, 
      {
        name: 'Tutorías',
        content: 'Es un programa destinado a jóvenes a partir del tercer año de secundaria,\n\
        cuyo objetivo es garantizar su permanencia en la escuela y construir un\n\
        proyecto de vida que da sentido al colegio.',
        image: 'https://www.elplural.com/uploads/s1/27/09/98/un-grupo-de-estudiantes-0.gif',
        createdAt: new Date,
        updatedAt: new Date
      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
