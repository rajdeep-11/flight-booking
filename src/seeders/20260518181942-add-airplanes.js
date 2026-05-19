'use strict';
const { Op } = require('sequelize')
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
   await queryInterface.bulkInsert('Airplanes', [
    {
      modelNumber: "Boeing 777",
      capacity: 350,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      modelNumber: "Airbus A380",
      capacity: 900,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Airplanes', {[Op.or]: [
      {modelNumber: 'Boeing 777'}, 
      {modelNumber: 'Airbus A380'}, 
      {modelNumber: 'AirbusA440'}
    ]});
  }
};
