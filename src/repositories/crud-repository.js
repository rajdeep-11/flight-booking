const { Logger } = require('../config')

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        console.log("Inside CRUD repository");
        
        const response = await this.model.creat(data);
        return response;
        
        Logger.error('Something went wrong in Crud repo : create');
        throw error;
        
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