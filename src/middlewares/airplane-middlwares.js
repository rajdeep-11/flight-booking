const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if(!req.body.modelNumber){
        const errorResponse = ErrorResponse();
        errorResponse.message = 'Something went wrong while creating airplane';
        errorResponse.error = new AppError(['Model Number not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    next();
}

function validateUpdateRequest(req, res, next) {
    if (req.body.modelNumber === undefined && req.body.capacity === undefined) {
        const errorResponse = ErrorResponse();
        errorResponse.message = 'Something went wrong while updating airplane';
        errorResponse.error = new AppError(['No update fields provided in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
};