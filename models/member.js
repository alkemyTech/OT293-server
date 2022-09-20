'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Member.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    facebookUrl: {
      allowNull: true,
      type: DataTypes.STRING,
      field: "facebook_url",
    },
    instagramUrl: {
      allowNull: true,
      type: DataTypes.STRING,
      field: "instagram_url",
    },
    linkedinUrl: {
      allowNull: true,
      type: DataTypes.STRING,
      field: "linkedin_url",
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    deletedAt: {
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
    modelName: 'Member',
    paranoid: true
  });
  return Member;
};