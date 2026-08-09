const { StatusCodes } = require('http-status-codes')

const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { Op } = require('sequelize');

const { compareTime } = require('../utils/helpers/datetime-helpers');


const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        if(!compareTime(data.departureTime, data.arrivalTime)) {
            throw new AppError(['Departure time must be before Arrival time'], StatusCodes.BAD_REQUEST);
        }
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        if (error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        if (error.name == 'SequelizeForeignKeyConstraintError') {
            const field = error.fields ? error.fields.join(', ') : 'unknown field';
            const table = error.table || 'unknown table';
            throw new AppError(
                [`Foreign key constraint failed: '${field}' does not exist in the '${table}' table`],
                StatusCodes.BAD_REQUEST
            );
        }
        console.error('[FlightService] Unhandled error in createFlight:', error);
        throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = "23:59:00";
    //trips filter:
    if(query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;

        if (departureAirportId == arrivalAirportId) {
            throw new AppError(['Deperture and Arrival Airport must not be the same'], StatusCodes.BAD_REQUEST);
        }
    }

    //price filter:
    if(query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, (maxPrice == undefined) ? 30000 : maxPrice]
        }
    }

    //Traveller filter:
    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    //Trip date filer:
    if(query.tripdate) {
        customFilter.depertureTime = {
            [Op.between]: [query.tripdate, query.tripdate + endingTripTime]
        }
    }

    //sort based on different filters:
    if(query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((params) => params.split('_'));
        sortFilter = sortFilters;
    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createFlight,
    getAllFlights
}