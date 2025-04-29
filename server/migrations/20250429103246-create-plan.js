'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        }
      },
      StatusId : {
        type : Sequelize.INTEGER,
        references : {
          model : 'Statuses',
          key : 'id'
        }
      },
      longitudeLocation: {
        type: Sequelize.FLOAT
      },
      latitudeLocation: {
        type: Sequelize.FLOAT
      },
      longitudeDestination: {
        type: Sequelize.FLOAT
      },
      latitudeDestination: {
        type: Sequelize.FLOAT
      },
      displayNameLocation: {
        type: Sequelize.STRING
      },
      displayNameDestination: {
        type: Sequelize.STRING
      },
      recommendationItems: {
        type: Sequelize.TEXT
      },
      timeTemperaturePredicted: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plans');
  }
};