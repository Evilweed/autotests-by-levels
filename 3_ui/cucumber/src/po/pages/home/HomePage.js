const BasePage = require('../BasePage');
const InfoBlock = require('../../blocks/home/InfoBlock')

class HomePage extends BasePage {

    constructor(protractor) {
        super(protractor, protractor.$('#home'), '/');
        this.infoBlock = new InfoBlock(this.protractor, this.rootEl);
    }
}

module.exports = HomePage;
