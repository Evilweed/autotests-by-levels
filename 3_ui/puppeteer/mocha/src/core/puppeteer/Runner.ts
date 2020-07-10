import {Browser, launch, Page, Target} from 'puppeteer';
import {Logger} from '../../helpers/Logger';
import {config} from '../../../puppeteer.conf';

export interface IRunner {
    readonly browser: Browser;
    readonly page: Page;
    readonly target: Target;
}

export declare let browser: Browser;
export declare let page: Page;
export declare let target: Target;

const logger = Logger('Puppeteer-Runner');

const puppeteerConf = config.puppeteer;

export async function run(): Promise<IRunner> {

    browser = await launch(puppeteerConf);
    target = await browser.waitForTarget((t: Target) => t.type() === 'page');
    page = await target.page();

    logger.info('Run browser');
    logger.debug('[run()] Puppeteer config', puppeteerConf);

    return {
        browser,
        page,
        target
    };
}

export function stop(): Promise<void> {
    logger.info('Stop browser');
    logger.debug('[stop()] Puppeteer config', puppeteerConf);
    return browser.close();
}
