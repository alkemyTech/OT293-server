'use strict';
<<<<<<< HEAD
const { Model } = require('sequelize');
=======
const {Model} = require('sequelize');
>>>>>>> a341d3fc7000f621a266b8abcaa497a2fc21ee9e
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Role.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Role',
    paranoid: true,
    timestamps: true
  });
  return Role;
};