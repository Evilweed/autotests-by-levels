import {join} from 'path';
import {ScreenshotOptions} from 'puppeteer';
import {page} from '../core/puppeteer/Runner';
import {FileSystemHelper} from './FileSystemHelper';
import {Logger} from './Logger';
import * as log4js from 'log4js';

interface IScreenshotData {
    name: string;
    type: 'image/png';
    content: Buffer | string;
}

export class ScreenshotsHelper {
    private readonly logger: log4js.Logger;
    private readonly fileSystemHelper: FileSystemHelper;

    constructor(private readonly path: string) {
        this.logger = Logger(this.constructor.name);
        this.fileSystemHelper = new FileSystemHelper(this.path);
    }

    public async take(title: string, options?: ScreenshotOptions): Promise<IScreenshotData> {
        const titleForName = title.replace(/\s/gm, '_');
        const name = `${new Date().valueOf()}_PID_${process.pid}_${titleForName}.png`;
        const path = join(process.cwd(), this.path, name);

        await this.fileSystemHelper.makeDir();

        const content = await page.screenshot(Object.assign({path}, options));

        this.logger.info(`Screenshot has been made. File name: ${name}`);

        return {
            name,
            type: 'image/png',
            content
        };
    }
}
