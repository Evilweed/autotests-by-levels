import {Puppeteer} from '../core/puppeteer/Puppeteer';
import * as Chai from 'chai';
import {step} from '../helpers/reporter/step';
import {IRootEl} from '../helpers/SelectorHelper';

export abstract class BaseAsserts {

    public readonly expect: Chai.ExpectStatic;

    public readonly rootEl: IRootEl;

    protected isPositive = true;

    protected constructor(private readonly puppeteer: Puppeteer) {
        this.expect = Chai.expect;
        this.rootEl = this.puppeteer.rootEl;
    }

    get not() {
        this.isPositive = false;
        return this;
    }

    @step()
    async visible() {
        let isVisible = false;
        try {
            await this.puppeteer.wait.visible(this.isPositive);
            isVisible = true;
        } catch (e) {
            //
        } finally {
            const message =
                `[assert::visible] The ${this.puppeteer.constructor.name} element with ${JSON.stringify(this.rootEl)} locator
                        is ${isVisible!} but should be ${this.isPositive} visible
                        `;

            this.expect(this.isPositive).to.be.equal(isVisible, message);
        }
    }
}
