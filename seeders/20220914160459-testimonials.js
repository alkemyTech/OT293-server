'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Testimonials', [{
        name: 'Camila',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        content: 'This ONG is amazing! I love it!',
        createdAt: new Date,
        updatedAt: new Date
      }], {});
    
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
