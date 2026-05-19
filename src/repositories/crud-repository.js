const { Logger } = require('../config')

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destory(data) {
        try {
            const response = await this.model.destory({
                where: {
                    id: data
                }
            });
            return response;
        } catch (error) {
            Logger.error('Something went wrong in Crud repo : destory');
            throw error;
        }
    }

    async get(data) {
        try {
            const response = await this.model.findByPk(data);
            return response;
        } catch (error) {
            Logger.error('Something went wrong in Crud repo : get');
            throw error;
        }
    }

    async getAll(data) {
        try {
            const response = await this.model.findAll(data);
            return response;
        } catch (error) {
            Logger.error('Something went wrong in Crud repo: getAll');
            throw error;
        }
    }

    async update(id, data) { //data --> ojbect{coloum : value,......}
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            Logger.error('Something went wrong in Crud repo: update');
            throw error;
        }
    }

}

module.exports = CrudRepository;