const Protractor = require('../../core/protractor/Protractor');
const HeaderBlock = require('../blocks/header/HeaderBlock');

class BasePage extends Protractor {
    /**
     * @param protractor {Ptor}
     * @param rootEl {ElementFinder|ElementArrayFinder}
     * @param url {string}
     */
    constructor(protractor, rootEl, url) {
        super(protractor, rootEl);
        this.url = url;
        this.baseUrl = this.protractor.browser.baseUrl;
        this.header = new HeaderBlock(this.protractor);
    }

    get(url = this.url) {
        return this.browser.get(url);
    }

    async isOpened() {
        try {
            await this.browser.wait(
                this.EC.urlIs(this.baseUrl + this.url),
                5000,
                `[isOpened] The page ${this.constructor.name} doesn"t contain ${this.baseUrl + this.url}.`
            );
            await this.browser.wait(
                this.EC.visibilityOf(this.rootEl),
                5000,
                `[isOpened]  The element ${this.rootEl.locator()} is not visible on ${this.constructor.name}.`
            );
            return true;
        } catch (e) {
            return false;
        }
    }
}

module.exports = BasePage;
