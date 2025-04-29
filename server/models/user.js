'use strict';
const {signToken} = require('../helpers/bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Plan, {foreignKey : 'UserId'})
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Username is required'
        },
        notEmpty : {
          msg : 'Username is required'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Email is required'
        },
        notEmpty : {
          msg : 'Email is required'
        },
        isEmail : {
          msg : 'Email format is wrong'
        }
      },
      unique : true
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Password is required'
        },
        notEmpty : {
          msg : 'Password is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate(instance) {
        instance.password = signToken(instance.password)
      }
    }
  });
  return User;
};