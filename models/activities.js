const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Activities extends Model {
    static associate(models) {
      // define association here
    }
  }
  Activities.init({
    // id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Activities',
    paranoid: true,
  });
  return Activities;
};
