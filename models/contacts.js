'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  contacts.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contacts',
  });
  return contacts;
};