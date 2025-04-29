'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Plan.belongsTo(models.User, {foreignKey : 'UserId'})
    }
  }
  Plan.init({
    UserId: DataTypes.INTEGER,
    longitudeLocation: DataTypes.FLOAT,
    latitudeLocation: DataTypes.FLOAT,
    longitudeDestination: DataTypes.FLOAT,
    latitudeDestination: DataTypes.FLOAT,
    displayNameLocation: DataTypes.STRING,
    displayNameDestination: DataTypes.STRING,
    recommendationItems: DataTypes.STRING,
    timeTemperaturePredicted: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};