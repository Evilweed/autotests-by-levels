const {BASE_URL} = require('../../api.conf');
const Request = require('../core/got/Request');

class BaseController {

    constructor(postfix) {
        const options = {
            responseType: 'json'
        }

        this.request = () => new Request(BASE_URL + postfix, options);
    }

    getAll(jsonSchemaPath = '') {
        return this.request()
            .jsonSchema(jsonSchemaPath)
            .send();
    }

    getById(id, jsonSchemaPath = '') {
        return this.request()
            .url(`/${id}`, false)
            .jsonSchema(jsonSchemaPath)
            .send();
    }
}

module.exports = BaseController;
