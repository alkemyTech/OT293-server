'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Slide.belongsTo(models.Organizations, {as: 'organization'});
    }
  };
  Slide.init({
    order: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING,
      field: "image_url",
    },
    organizationId: {
      type: DataTypes.INTEGER,
      field: "organization_id",
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "deleted_at",
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "updated_at",
    },
  }, {
    sequelize,
    modelName: 'Slide',
    paranoid: true,
    freezeTableName: true
  });
  return Slide;
};