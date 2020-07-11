import {Puppeteer} from '../core/puppeteer/Puppeteer';
import {page} from '../core/puppeteer/Runner';
import {config} from '../../puppeteer.conf';
import {NavigationOptions, Request, Response, Timeoutable, WaitForSelectorOptions} from 'puppeteer';
import {BasePage} from '../po/pages/BasePage';
import {BaseElement} from '../po/elements/BaseElement';

async function checkCondition(
    condition: () => Promise<boolean>, interval: number, timeout: number,
    resolve: () => void, reject: (reason: Error) => void
) {
    try {
        const value = await condition();

        if (value) {
            return resolve();
        }

        timeout -= interval;

        if (timeout <= 0) {
            return reject(new Error('Timeout is reached.'));
        }

        return setTimeout(checkCondition, interval, condition, interval, timeout, resolve, reject);
    } catch (e) {
        throw new Error(e);
    }
}

export class WaitHelper {
    constructor(private readonly puppeteer: Puppeteer | BasePage | BaseElement) {
    }

    public selector(options: WaitForSelectorOptions, selector = this.puppeteer.rootEl.selector) {
        return page.waitForSelector(selector, options);
    }

    public present(timeout = config.timeout.s) {
        return this.until(
            async () => {
                try {
                    if (this.puppeteer.rootEl.isCollection) {
                        const elms = await this.puppeteer.elements();
                        return elms && elms.length > 1;
                    }

                    const el = await this.puppeteer.element();
                    return !!el;
                } catch (e) {
                    return false;
                }
            },
            timeout
        );
    }

    public async visible(visible = true, timeout = config.timeout.s) {
        const options = {visible, timeout};

        await this.present();

        if (this.puppeteer.rootEl.isCollection) {

            const elms = await this.puppeteer.elements();
            const selectors = [];

            for (const el of elms) {
                selectors.push(await this.puppeteer.selectorFromElement(el));
            }

            const elements = [];

            for (const item of selectors) {
                elements.push(page.waitForSelector(item, options));
            }

            return Promise.all(elements);
        }
        const selector = await this.puppeteer.selectorFromElement(await this.puppeteer.element());
        return page.waitForSelector(selector, options);
    }

    public async url(timeout = config.timeout.s) {
        return this.until(
            async () => {
                const currentUrl = page.url();
                return currentUrl.includes(config.baseUrl) && currentUrl.includes(this.puppeteer instanceof BasePage ? this.puppeteer.url : '');
            },
            timeout
        );
    }

    public request(urlOrPredicate: string | ((req: Request) => boolean), options?: Timeoutable) {
        return page.waitForRequest(urlOrPredicate, options);
    }

    public response(urlOrPredicate: string | ((res: Response) => boolean), options?: Timeoutable) {
        return page.waitForResponse(urlOrPredicate, options);
    }

    public navigation(options?: NavigationOptions) {
        return page.waitForNavigation(options);
    }

    public forPageReady() {
        return page.waitForFunction(() => window.status === 'ready');
    }

    public time(ms: number) {
        return page.waitFor(ms);
    }

    public until(condition: () => Promise<boolean>, timeout = config.timeout.l, interval = config.timeout.sec / 10): Promise<void> {
        return new Promise((resolve, reject) => checkCondition(condition, interval, timeout, resolve, reject));
    }
}
