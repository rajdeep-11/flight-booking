'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Flights', 'priece', 'price');

    await queryInterface.renameColumn('Flights', 'boardingPass', 'boardingGate');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Flights', 'priece', 'price');

    await queryInterface.renameColumn('Flights', 'boardingPass', 'boardingGate');
  }

};
