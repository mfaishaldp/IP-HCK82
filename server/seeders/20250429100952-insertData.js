'use strict';

const {signToken} = require('../helpers/bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dataUser = require('../data/users.json').map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      el.password = signToken(el.password)
      return el
    })
    const dataStatus = require('../data/statuses.json').map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    const dataPlan = require('../data/plans.json').map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Users',dataUser)
    await queryInterface.bulkInsert('Statuses',dataStatus)
    await queryInterface.bulkInsert('Plans',dataPlan)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Statuses',null)
    await queryInterface.bulkDelete('Users',null)
    await queryInterface.bulkDelete('Plans',null)
  }
};
