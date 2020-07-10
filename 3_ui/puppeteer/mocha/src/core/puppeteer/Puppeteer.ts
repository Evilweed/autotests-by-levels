import {elementHandler, IRootEl} from '../../helpers/SelectorHelper';
import {ClickOptions, ElementHandle} from 'puppeteer';
import {Logger} from '../../helpers/Logger';
import * as log4js from 'log4js';
import {WaitHelper} from '../../helpers/WaitHelper';

export abstract class Puppeteer {

    public readonly wait: WaitHelper;

    protected readonly logger: log4js.Logger;

    protected constructor(public readonly rootEl: IRootEl) {
        this.wait = new WaitHelper(this);
        this.logger = Logger(this.constructor.name);
    }

    get elementHandler() {
        return elementHandler(this.rootEl);
    }

    public async elements(): Promise<ElementHandle[]> {
        const elms = await this.elementHandler.$$();

        if (!elms.length) {
            throw new Error(`The elements was not found: ${JSON.stringify(this.rootEl)}`);
        }

        return elms;
    }

    public async element(): Promise<ElementHandle> {

        const elem = await this.elementHandler.$();

        if (!elem) {
            throw new Error(`The element was not found: ${JSON.stringify(this.rootEl)}`);
        }

        return elem;
    }

    public $(childSelector: string): IRootEl {
        return {
            selector: this.rootEl.selector + ' ' + childSelector
        };
    }

    public $$(childSelector: string): IRootEl {
        return {
            selector: this.rootEl.selector + ' ' + childSelector,
            isCollection: true
        };
    }

    public selectorFromElement(element: ElementHandle): Promise<string> {
        return elementHandler(element).selector();
    }

    public async getSingleElement(index = 0): Promise<ElementHandle> {
        let element: ElementHandle;

        if (this.rootEl.isCollection) {
            const el = await this.elements();
            element = el[index];
        } else {
            element = await this.element();
        }
        return element;
    }

    public async click(options?: ClickOptions) {
        this.logger.debug('Click on:', this.rootEl, 'Options', options);
        this.logger.debug('Selector from the element', await this.elementHandler.selector());
        const element = await this.getSingleElement();
        return element.click(options);
    }
}
