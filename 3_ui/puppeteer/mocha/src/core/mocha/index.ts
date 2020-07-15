import {it as mochaIt} from 'mocha';
import {Logger} from '../../helpers/Logger';
import {allure} from 'allure-mocha/runtime';
import {ContentType} from 'allure-js-commons';
import {ScreenshotsHelper} from '../../helpers/ScreenshotsHelper';
import {config} from '../../../puppeteer.conf';

const logger = Logger('Core-Mocha');

export {
    describe,
    before,
    beforeEach,
    after,
    afterEach
} from 'mocha';

export function it(title: string, fn: () => void | Promise<void>) {
    mochaIt(title, async () => {
        try {
            await fn();
        } catch (e) {
            logger.debug(title);

            const screenshotHelper = new ScreenshotsHelper(config.artifacts.screenshots);
            const {content} = await screenshotHelper.take(title);

            allure.createAttachment(`${title} failed`, content, ContentType.PNG);

            throw e;
        }
    });
}
