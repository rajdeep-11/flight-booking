const { StatusCodes } = require('http-status-codes')

const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');


const cityRepository = new CityRepository();

async function createCity(data) {
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

async function getCities() {
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch (error) {
        throw new AppError('Cannot able to fetch the cities', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function deleteCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The city you reqested is not present', error.statusCode);
        }
        throw new AppError('Cannot destroy the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id, data) {
    try {
        const response = await cityRepository.update(id, data);
        return response;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The city you reqested is not present', error.statusCode);
        }
        throw new AppError('Cannot update the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createCity,
    getCities,
    deleteCity,
    updateCity
}