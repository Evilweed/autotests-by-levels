import {ElementArrayFinder, ElementFinder, ProtractorBrowser, ProtractorExpectedConditions, Ptor} from 'src/core/protractor/Protractor';
import * as log4js from 'log4js';
import {Logger} from '../../helpers/Logger';
import {WaitHelper} from '../../helpers/WaitHelper';

export abstract class Protractor {

    public readonly EC: ProtractorExpectedConditions;
    public readonly browser: ProtractorBrowser;
    public readonly $: (query: string) => ElementFinder;
    public readonly $$: (query: string) => ElementArrayFinder;

    public readonly wait: WaitHelper;

    protected readonly logger: log4js.Logger;

    protected constructor(public readonly protractor: Ptor, public readonly rootEl: ElementFinder | ElementArrayFinder) {
        this.EC = this.protractor.ExpectedConditions;
        this.browser = this.protractor.browser;
        this.$ = (query: string) => this.browser.$(query);
        this.$$ = (query: string) => this.browser.$$(query);

        this.wait = new WaitHelper(this);

        this.logger = Logger(this.constructor.name);
    }

    public locator() {
        return this.rootEl.locator();
    }

    public isPresent() {
        return this.rootEl.isPresent();
    }

    public isDisplayed() {
        return this.rootEl.isDisplayed();
    }

    public async isVisible() {
        return await this.isPresent() ? this.isDisplayed() : false;
    }

    public async click() {
        await this.wait.visibilityOf();
        await this.wait.elementToBeClickable();
        this.logger.info(`click on: ${this.locator()}`);
        return this.rootEl.click();
    }

    public async getText() {
        await this.wait.presenceOf();
        this.logger.info(`getText from: ${this.locator()}`);
        return this.rootEl.getText();
    }
}
