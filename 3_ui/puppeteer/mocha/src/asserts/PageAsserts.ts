import {BaseAsserts} from './BaseAsserts';
import {BasePage} from '../po/pages/BasePage';
import {config} from '../../puppeteer.conf';
import {page} from '../core/puppeteer/Runner';

export class PageAsserts extends BaseAsserts {

    constructor(private readonly basePage: BasePage) {
        super(basePage);
    }

    public async opened() {
        let urlIs = false;
        let isDisplayed = false;

        try {
            await this.basePage.wait.url();
            urlIs = true;

            await this.basePage.wait.visible();
            isDisplayed = true;
        } finally {

            this.expect(this.isPositive).to.be.equal(
                urlIs,
                `[assert::opened] The ${this.basePage.constructor.name} (${JSON.stringify(this.basePage.rootEl)})
                        ${!this.isPositive ? 'doesn"t contain' : 'contains'} ${config.baseUrl + this.basePage.url}
                        Current url: ${await page.url()}
                        `
            );

            this.expect(this.isPositive).to.be.equal(
                isDisplayed,
                `[assert::opened] The ${JSON.stringify(this.basePage.rootEl)} element
                        is ${isDisplayed} visible on ${this.basePage.constructor.name}
                        but should be ${this.isPositive} visible
                        `
            );
        }
    }
}
