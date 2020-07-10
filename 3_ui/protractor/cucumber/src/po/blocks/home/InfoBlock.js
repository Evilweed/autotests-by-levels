const BaseBlock = require('../BaseBlock');
const BaseElement = require('../../elements/BaseElement');
const ButtonElement = require('../../elements/button/ButtonElement');

class InfoBlock extends BaseBlock {
    constructor(protractor, rootEl) {
        super(protractor, rootEl.$('#intro'));
    }

    get logo() {
        return new BaseElement(this.protractor, this.rootEl.$('.hero-logo'));
    }

    get startedBtn() {
        return new ButtonElement(this.protractor, this.rootEl.$('.button.hero-cta'));
    }
}

module.exports = InfoBlock;
