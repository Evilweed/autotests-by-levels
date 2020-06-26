const BaseBlock = require('../BaseBlock');
const InputElement = require('../../elements/input/InputElement');

class HeaderBlock extends BaseBlock {
    constructor(protractor) {
        super(protractor, protractor.$('mat-toolbar'));
    }

    get searchInput() {
        return new InputElement(this.protractor, this.rootEl.$('.search-container input'));
    }

    /**
     * @param value {string}
     * @return {Promise<ActionSequence|void>}
     */
    executeSearch(value) {
        return this.searchInput.setValue(value);
    }
}

module.exports = HeaderBlock;
