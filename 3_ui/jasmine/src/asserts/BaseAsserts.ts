import {Protractor} from '../core/protractor/Protractor';

export abstract class BaseAsserts {

    protected isPositive = true;

    protected constructor(private readonly protractor: Protractor) {
    }

    get not() {
        this.isPositive = false;
        return this;
    }

    async displayed() {
        let isDisplayed = false;
        try {
            await this.protractor.wait.visibilityOf();
            isDisplayed = true;
        } finally {
            expect(this.isPositive).toBe(
                isDisplayed,
                `[assert::isDisplayed] The element ${this.protractor.constructor.name} with locator ${this.protractor.locator()} is ${isDisplayed} but should be ${this.isPositive} visible`
            );
        }
    }
}
