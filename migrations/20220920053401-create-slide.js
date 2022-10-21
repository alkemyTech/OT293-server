'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Slides', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order: {
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING,
      },
      organizationId: {
        type: Sequelize.INTEGER,
        field: "organization_id",
        references: {
          model: 'Organizations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: "deleted_at",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Slides');
  }
};