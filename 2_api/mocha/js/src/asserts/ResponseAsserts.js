const BaseAsserts = require('./BaseAsserts');
const {validate} = require('../models');
const {join, resolve} = require('path');

class ResponseAsserts extends BaseAsserts {

    contract(pathToJsonSchema) {
        const schema = require(resolve(join('src', 'models', pathToJsonSchema)));
        const {valid, errors} = validate(this.data.body.get(), schema);

        if (!valid) {
            throw new Error(JSON.stringify(...errors).replace(/,/g, ',\n\t'));
        }
    }

}

module.exports = ResponseAsserts;
