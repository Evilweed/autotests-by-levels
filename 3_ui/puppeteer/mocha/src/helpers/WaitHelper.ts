import {Puppeteer} from '../core/puppeteer/Puppeteer';
import {page} from '../core/puppeteer/Runner';
import {config} from '../../puppeteer.conf';
import {NavigationOptions, Request, Response, Timeoutable, WaitForSelectorOptions} from 'puppeteer';
import {BasePage} from '../po/pages/BasePage';
import {BaseElement} from '../po/elements/BaseElement';
import {step} from './reporter/step';
import {IRootEl} from './SelectorHelper';

async function checkCondition(
    condition: () => Promise<boolean>, interval: number, timeout: number,
    resolve: () => void, reject: (reason: Error) => void, errMsg?: string
) {
    try {
        const value = await condition();

        if (value) {
            return resolve();
        }

        timeout -= interval;

        if (timeout <= 0) {
            return reject(new Error(errMsg || 'Timeout is reached.'));
        }

        return setTimeout(checkCondition, interval, condition, interval, timeout, resolve, reject, errMsg);
    } catch (e) {
        throw new Error(e);
    }
}

export class WaitHelper {

    public readonly rootEl: IRootEl;

    constructor(private readonly puppeteer: Puppeteer | BasePage | BaseElement) {
        this.rootEl = this.puppeteer.rootEl;
    }

    @step()
    public selector(options: WaitForSelectorOptions, selector = this.rootEl.selector) {
        return page.waitForSelector(selector, options);
    }

    @step()
    public present(present = true, timeout = config.timeout.sec) {
        return this.until(
            async () => {
                try {
                    if (this.rootEl.isCollection) {
                        const elms = await this.puppeteer.elements();
                        return present && (elms && elms.length > 1);
                    }

                    const el = await this.puppeteer.element();
                    return present && !!el;
                } catch (e) {
                    return false;
                }
            },
            timeout,
            config.timeout.sec / 10,
            `The ${this.puppeteer.constructor.name} element with ${JSON.stringify(this.rootEl)} selector ${!present ? 'is' : 'isn"t'} present`
        );
    }

    @step()
    public async visible(visible = true, timeout = config.timeout.sec) {
        const options = {visible, timeout};

        await this.present(visible, timeout);

        if (this.rootEl.isCollection) {

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
        const element = await this.puppeteer.element();
        const selector = await this.puppeteer.selectorFromElement(element);
        return page.waitForSelector(selector, options);
    }

    @step()
    public async url(timeout = config.timeout.sec) {
        const expectedUrl = config.baseUrl + (this.puppeteer instanceof BasePage ? this.puppeteer.url : '');

        return this.until(
            async () => {
                const currentUrl = page.url();
                return currentUrl.includes(config.baseUrl) && currentUrl === expectedUrl;
            },
            timeout,
            config.timeout.sec / 5,
            `Url doesn"t equal ${expectedUrl}. Current: ${page.url()}`
        );
    }

    @step()
    public request(urlOrPredicate: string | ((req: Request) => boolean), options?: Timeoutable) {
        return page.waitForRequest(urlOrPredicate, options);
    }

    @step()
    public response(urlOrPredicate: string | ((res: Response) => boolean), options?: Timeoutable) {
        return page.waitForResponse(urlOrPredicate, options);
    }

    @step()
    public navigation(options?: NavigationOptions) {
        return page.waitForNavigation(options);
    }

    @step()
    public time(ms: number) {
        return page.waitFor(ms);
    }

    @step()
    public until(
        condition: () => Promise<boolean>, timeout = config.timeout.l, interval = config.timeout.sec / 10, errMsg?: string
    ): Promise<void> {
        return new Promise((resolve, reject) => checkCondition(condition, interval, timeout, resolve, reject, errMsg));
    }
}
