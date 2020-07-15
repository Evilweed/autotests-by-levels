// @ts-ignore
import * as har from 'chrome-har';
import {page} from '../core/puppeteer/Runner';
import {FileSystemHelper} from './FileSystemHelper';
import * as log4js from 'log4js';
import {Logger} from './Logger';
import {CDPSession} from 'puppeteer';

export class HarHelper {

    private readonly observe = [
        'Page.loadEventFired',
        'Page.domContentEventFired',
        'Page.frameStartedLoading',
        'Page.frameAttached',
        'Page.frameScheduledNavigation',
        'Network.requestWillBeSent',
        'Network.requestServedFromCache',
        'Network.dataReceived',
        'Network.responseReceived',
        'Network.resourceChangedPriority',
        'Network.loadingFinished',
        'Network.loadingFailed',
    ];

    private events = [{}];

    private client!: CDPSession;

    private readonly logger: log4js.Logger;
    private readonly fileSystemHelper: FileSystemHelper;

    constructor(path: string) {
        this.logger = Logger(this.constructor.name);
        this.fileSystemHelper = new FileSystemHelper(path);
    }

    public async start(): Promise<void> {
        this.client = await page.target().createCDPSession();

        await this.client.send('Page.enable');
        await this.client.send('Network.enable');

        this.observe.forEach((method: string) => {
            this.client.on(method, (params: any) => {
                this.events.push({method, params});
            });
        });
        this.logger.info('"Har" capture began.');
    }

    public async stop(): Promise<void> {
        const _har = har.harFromMessages(this.events);
        const name = `${new Date().valueOf()}_PID_${process.pid}_chrome_browser_log.har`;

        this.observe.forEach((method: string) => this.client.removeAllListeners(method));

        this.logger.info(`"Har" capture completed. File name: ${name}`);

        await this.fileSystemHelper.makeDir();
        return this.fileSystemHelper.writeFileStream(JSON.stringify(_har), name);
    }
}
