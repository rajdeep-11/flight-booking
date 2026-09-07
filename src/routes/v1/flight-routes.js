const express = require('express');

const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares')
const router = express.Router();

console.log("Inside flight routes");

//  /api/v1/flights POST
router.post('/', 
    FlightMiddlewares.validateCreateRequest, 
    FlightController.createFlight);

// /api/v1/flights?trips=CCU-BLR GET
router.get('/', 
    FlightController.getAllFlights);

// /api/v1/flights/:id GET
router.get('/:id', 
    FlightController.getFlight);

// /api/v1/flighrs/:id/seats PATCH
router.patch(
    '/:id/seats', 
    FlightMiddlewares.validateUpdateSeatsRequest, 
    FlightController.updateSeats
);

module.exports = router;
