import {run, stop} from '../core/puppeteer/Runner';

export const mochaHooks = {
    async beforeAll() {
        await run();
    },
    async afterAll() {
        await stop();
    }
};
