import {EventEmitter} from 'events';
import {PageEventObj} from 'puppeteer';
import {page} from '../core/puppeteer/Runner';
import {Logger} from './Logger';
import * as log4js from 'log4js';

export class NetworkHelper {

    private readonly logger: log4js.Logger;

    constructor() {
        this.logger = Logger(this.constructor.name);
    }

    public setRequestInterception(enabled: boolean) {
        this.logger.info(`setRequestInterception::is switched ${enabled ? 'on' : 'off'}`);
        return page.setRequestInterception(enabled);
    }

    public addListener<K extends keyof PageEventObj>(
        method: keyof EventEmitter,
        eventName: K,
        handler?: (e: PageEventObj[K], ...args: any[]) => void
    ) {
        this.logger.info(`addListener::Actions with listeners. method: ${method}, eventName: ${eventName}`);
        // @ts-ignore
        page[method](eventName, handler);
    }
}
