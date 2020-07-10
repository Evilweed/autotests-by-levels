import {describe, it} from 'mocha';
import {page} from '../core/puppeteer/Runner';

describe('Example suite', () => {

    it('Example test', async () => {
        await page.goto('https://www.google.com');
    });

    it('Example test', async () => {
        await page.goto('https://www.google.com');
    });
});
