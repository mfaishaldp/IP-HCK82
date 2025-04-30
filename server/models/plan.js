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
      Plan.belongsTo(models.Status, {foreignKey : 'StatusId'})
    }
  }
  Plan.init({
    UserId: DataTypes.INTEGER,
    StatusId : DataTypes.INTEGER,
    longitudeLocation: {
      type : DataTypes.FLOAT,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Longitude Location is required'
        },
        notNull : {
          msg : 'Longitude Location is required'
        }
      }
    },
    latitudeLocation: {
      type : DataTypes.FLOAT,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Latitude Location is required'
        },
        notNull : {
          msg : 'Latitude Location is required'
        }
      }
    },
    longitudeDestination: {
      type : DataTypes.FLOAT,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Longitude Destination is required'
        },
        notNull : {
          msg : 'Longitude Destination is required'
        }
      }
    },
    latitudeDestination: {
      type : DataTypes.FLOAT,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Latitude Destination is required'
        },
        notNull : {
          msg : 'Latitude Destination is required'
        }
      }
    },
    displayNameLocation: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Location Name is required'
        },
        notNull : {
          msg : 'Location Name is required'
        }
      }
    },
    displayNameDestination: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Destination Name is required'
        },
        notNull : {
          msg : 'Destination Name is required'
        }
      }
    },
    recommendationItems: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Recommendation Item is required'
        },
        notNull : {
          msg : 'Recommendation Item is required'
        }
      }
    },
    timeTemperaturePredicted: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Time and Temperature is required'
        },
        notNull : {
          msg : 'Time and Temperature is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Plan'
  });
  return Plan;
};