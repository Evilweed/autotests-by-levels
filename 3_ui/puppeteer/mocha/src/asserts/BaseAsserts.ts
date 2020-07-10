import {Puppeteer} from '../core/puppeteer/Puppeteer';
import * as Chai from 'chai';

export abstract class BaseAsserts {

    public readonly expect: Chai.ExpectStatic;

    protected isPositive = true;

    protected constructor(private readonly puppeteer: Puppeteer) {
        this.expect = Chai.expect;
    }

    get not() {
        this.isPositive = false;
        return this;
    }

    async visible() {
        let isVisible = false;
        try {
            await this.puppeteer.wait.visible();
            isVisible = true;
        } finally {
            this.expect(this.isPositive).to.be.equal(
                isVisible,
                `[assert::visible] The ${this.puppeteer.constructor.name} element with ${JSON.stringify(this.puppeteer.rootEl)} locator
                        is ${isVisible}
                        but should be ${this.isPositive} visible
                        `
            );
        }
    }
}
