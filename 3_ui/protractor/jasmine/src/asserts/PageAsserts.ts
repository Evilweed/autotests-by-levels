import {BaseAsserts} from './BaseAsserts';
import {BasePage} from '../po/pages/BasePage';

export class PageAsserts extends BaseAsserts {

    constructor(private readonly page: BasePage) {
        super(page);
    }

    public async opened(): Promise<void> {

        let urlIs = false;
        let isDisplayed = false;

        try {
            await this.page.wait.urlIs();
            urlIs = true;

            await this.page.wait.visibilityOf();
            isDisplayed = true;
        } finally {

            expect(this.isPositive).toBe(
                urlIs,
                `
                [assert::isOpened] The page ${this.page.constructor.name} ${!this.isPositive ? 'doesn"t contain' : 'contains'} ${this.page.baseUrl + this.page.url}
                Current url: ${await this.page.getCurrentUrl()}`
            );

            expect(this.isPositive).toBe(
                isDisplayed,
                `[assert::isOpened] The element ${this.page.locator()} is ${isDisplayed} visible on ${this.page.constructor.name} but should be ${this.isPositive} visible`
            );
        }
    }
}
