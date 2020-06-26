import {Protractor} from '../core/protractor/Protractor';
import {ElementFinder} from 'protractor';
import {BasePage} from '../po/pages/BasePage';
import {BaseElement} from '../po/elements/BaseElement';

export class WaitHelper {
    constructor(private readonly protractor: Protractor | BasePage | BaseElement) {
    }

    public async visibilityOf(timeout?: number, errorMessage?: string) {
        try {
            if (this.protractor.rootEl instanceof ElementFinder) {
                await this.protractor.browser.wait(
                    this.protractor.EC.visibilityOf(this.protractor.rootEl),
                    timeout || 5000
                );
            } else {
                await this.protractor.browser.wait(
                    this.protractor.EC.visibilityOf(this.protractor.rootEl.get(1)),
                    timeout || 5000
                );
            }
        } catch (e) {
            e.message = errorMessage || `[wait::visibilityOf] The element ${this.protractor.locator()} is not visible on ${this.protractor.constructor.name}`;
            return new Error(e);
        }
    }

    public async presenceOf(timeout?: number, errorMessage?: string) {
        try {
            if (this.protractor.rootEl instanceof ElementFinder) {
                await this.protractor.browser.wait(
                    this.protractor.EC.presenceOf(this.protractor.rootEl),
                    timeout || 5000
                );
            } else {
                await this.protractor.browser.wait(
                    this.protractor.EC.presenceOf(this.protractor.rootEl.get(1)),
                    timeout || 5000
                );
            }
        } catch (e) {
            e.message = errorMessage || `[wait::presenceOf] The element ${this.protractor.locator()} is not present on ${this.protractor.constructor.name}`;
            return new Error(e);
        }
    }

    public async urlIs(url?: string, timeout?: number, errorMessage?: string) {
        if (this.protractor instanceof BasePage) {
            try {
                return this.protractor.browser.wait(
                    this.protractor.EC.urlIs(url || this.protractor.baseUrl + this.protractor.url),
                    timeout || 5000
                );
            } catch (e) {
                e.message = errorMessage ||
                    `[wait::urlIs] The page ${this.protractor.constructor.name} doesn"t contain ${url || this.protractor.baseUrl + this.protractor.url}
                     Current url: ${await this.protractor.getCurrentUrl()}`;

                return new Error(e);
            }
        }
        throw new Error(`[wait::urlIs] The method is available on for 'instanceof BasePage'. Current: ${this.protractor.constructor.name}`);
    }

    public async elementToBeClickable(timeout?: number, errorMessage?: string) {
        try {
            if (this.protractor.rootEl instanceof ElementFinder) {
                await this.protractor.browser.wait(
                    this.protractor.EC.elementToBeClickable(this.protractor.rootEl),
                    timeout || 5000
                );
            } else {
                await this.protractor.browser.wait(
                    this.protractor.EC.elementToBeClickable(this.protractor.rootEl.get(1)),
                    timeout || 5000
                );
            }
        } catch (e) {
            e.message = errorMessage || `[wait::elementToBeClickable] The element ${this.protractor.locator()} is not clickable on ${this.constructor.name}.`;
            return new Error(e);
        }
    }
}
