const {Logger} = require('../../helpers/Logger');

class Protractor {
    /**
     * @param protractor {Ptor}
     * @param rootEl {ElementFinder|ElementArrayFinder}
     */
    constructor(protractor, rootEl) {
        this.protractor = protractor;
        this.rootEl = rootEl;
        this.EC = this.protractor.ExpectedConditions;
        this.browser = this.protractor.browser;
        this.$ = query => this.browser.$(query);
        this.$$ = query => this.browser.$$(query);
        this.logger = Logger(this.constructor.name);
    }

    isPresent() {
        return this.rootEl.isPresent();
    }

    isDisplayed() {
        return this.rootEl.isDisplayed();
    }

    async click() {
        await this.browser.wait(
            this.EC.visibilityOf(this.rootEl),
            5000,
            `[Protractor::click] The element ${this.rootEl.locator()} is not visible on ${this.constructor.name}.`
        );

        await this.browser.wait(
            this.EC.elementToBeClickable(this.rootEl),
            5000,
            `[Protractor::click] The element ${this.rootEl.locator()} is not clickable on ${this.constructor.name}.`
        );

        this.logger.info(`click on: ${this.rootEl.locator()}`);
        return this.rootEl.click();
    }

    async getText() {
        await this.browser.wait(
            this.EC.presenceOf(this.rootEl),
            5000,
            `[Protractor::getText] The element ${this.rootEl.locator()} is not present on ${this.constructor.name}.`
        );

        this.logger.info(`getText from: ${this.rootEl.locator()}`);
        return this.rootEl.getText();
    }
}

module.exports = Protractor;
