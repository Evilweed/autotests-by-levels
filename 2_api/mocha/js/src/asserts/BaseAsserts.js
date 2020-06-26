const {expect} = require('chai');

class BaseAsserts {

    constructor(data) {
        this.data = data;
        this.expect = expect;
    }

    call(data) {
        return {
            expect: this.expect(data),
        }
    }
}

module.exports = BaseAsserts;
