'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId'
      });

      this.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportId',
      });

      this.belongsTo(models.Airport, {
        foreignKey: 'depertureAirportId',
      });
    }
  }
  Flight.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airplaneId: {
      type: DataTypes.INTEGER,
    },
    arrivalAirportId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    depertureAirportId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    depertureTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priece: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    boardingPass: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};