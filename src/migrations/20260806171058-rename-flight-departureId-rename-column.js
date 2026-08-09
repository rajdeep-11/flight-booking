'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'Flights', 
      'depertureAirportId', 
      'departureAirportId'
    );
    await queryInterface.renameColumn(
      'Flights', 
      'depertureTime', 
      'departureTime'
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'Flights', 
      'departureAirportId', 
      'depertureAirportId'
    );
    await queryInterface.renameColumn(
      'Flights', 
      'departureTime', 
      'depertureTime'
    );
  }
};