const { StatusCodes } = require('http-status-codes');

const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { Error } = require('sequelize');
/**
 * POST :/ flights 
 * req-body: {
 *  flightNumber: UK 808''
 *  airplaneId: 'a380'
 *  departureAirportId: 15   
 *  arrivalAirportId: 10
 *  arrivalTime: '10:00:20'
 *  departureTime: '08:00:10'
 *  priece: 5000
 *  boardingPass: 12A
 *  totalSeats: 120
 * 
 * }
 */

async function createFlight(req, res) {
    try {
        console.log('Departure id', req.body.departureAirportId);
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            departureTime: req.body.departureTime,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = flight;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function getAllFlights(req,res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        console.log(flights.length)
        if(flights.length === 0) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success : false,
                    message: 'Oops! No flight found in this route',
                    data: {}
                });
        }
        SuccessResponse.data = flights;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}




module.exports = {
    createFlight,
    getAllFlights
}