const { StatusCodes } = require('http-status-codes');

const { AirportService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { Error } = require('sequelize');

/**
 * 
 * POST :/ airports 
 * req-body:/ {name : 'IGI', cityId: 5, code: 'DEL'}
 */

async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            cityId: req.body.cityId,
            address: req.body.address
        });
        SuccessResponse.data = airport;
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

/*
* POST: /airplanes
* req-body {}

*/

async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
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

/*
* POST: /airplanes/:id
* req-body {}

*/

async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
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

/*
    * DELETE: /airplanes/:id
    * req-body {}
*/
async function deleteAirport(req, res) {
    try {
        const response = await AirportService.deleteAirport(req.params.id);
        SuccessResponse.data = response;
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

/*
    * PATCH: /airports/:id
    * req-body {modelNumber, capacity}
*/
async function updateAirport(req, res) {
    try {
        const airport = await AirportService.updateAirport(req.params.id, req.body);
        SuccessResponse.data = airport;
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
    createAirport,
    getAirports,
    getAirport,
    deleteAirport,
    updateAirport
}