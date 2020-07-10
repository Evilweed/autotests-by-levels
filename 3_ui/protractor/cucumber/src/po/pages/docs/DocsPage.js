const BasePage = require('../BasePage');

class DocsPage extends BasePage {
    constructor(protractor) {
        super(protractor, protractor.$('#docs'), '/docs');
    }
}

module.exports = DocsPage;
