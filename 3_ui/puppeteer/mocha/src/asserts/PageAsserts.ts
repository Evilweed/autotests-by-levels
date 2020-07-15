import {BaseAsserts} from './BaseAsserts';
import {BasePage} from '../po/pages/BasePage';
import {config} from '../../puppeteer.conf';
import {page} from '../core/puppeteer/Runner';
import {step} from '../helpers/reporter/step';

export class PageAsserts extends BaseAsserts {

    constructor(private readonly basePage: BasePage) {
        super(basePage);
    }

    @step()
    public async opened() {
        let urlIs = false;

        try {
            await this.basePage.wait.url();
            urlIs = true;
        } catch (e) {
            //
        } finally {
            const message =
                `[assert::opened] The ${this.basePage.constructor.name} (${JSON.stringify(this.rootEl)})
                        ${!this.isPositive ? 'doesn"t contain' : 'contains'} ${config.baseUrl + this.basePage.url} Current url: ${page.url()}
                        `;

            this.expect(this.isPositive).to.be.equal(urlIs, message);
        }
        return this.visible();
    }
}
