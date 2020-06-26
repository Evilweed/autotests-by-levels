const BaseElement = require('../BaseElement');

class InputElement extends BaseElement {

    clear() {
        return this.rootEl.clear();
    }

    /**
     * @param value {string|number}
     * @return {Promise<ActionSequence|void>}
     */
    async setValue(value) {
        await this.clear();
        return this.rootEl.sendKeys(value);
    }
}

module.exports = InputElement;
