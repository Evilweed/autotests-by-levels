const Protractor = require('../../core/protractor/Protractor');

class BaseElement extends Protractor {

    get(number) {
        return this.rootEl.get(number);
    }
}

module.exports = BaseElement;
