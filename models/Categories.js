const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Categories', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      description: {
          type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.TEXT
      }  
    }, { timestamps: true,
         paranoid: true })
}