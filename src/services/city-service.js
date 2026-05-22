const { StatusCodes } = require('http-status-codes')

const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');


const cityRepository = new CityRepository();

async function createCity(data) {
    console.log('inside city service');
    try {
        console.log('inside city crud TRY');
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        console.error('city-service createCity error:', error);
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message + ' { ' + err.value + ' is already present ' + '}');
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('city-service Cannot create a new city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

//async function

module.exports = {
    createCity
}