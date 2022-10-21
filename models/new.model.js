const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class New extends Model {

    static associate(models) {
      this.hasMany(models.Comments, {
        as: 'comments',
        foreignKey: 'newsId'
      })
    }
  }

  New.init({
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'New',
    paranoid: true,
  });

  return New;
};
