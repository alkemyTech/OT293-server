'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Organizations', 'facebook_url', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Organizations', 'linkedin_url', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Organizations', 'instagram_url', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Organizations', 'facebook_url'),
      queryInterface.removeColumn('Organizations', 'linkedin_url'),
      queryInterface.removeColumn('Organizations', 'instagram_url'),
    ])
  }
};
