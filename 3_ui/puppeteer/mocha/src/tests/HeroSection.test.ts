import {before, describe, it} from '../core/mocha';
import {App} from '../App';

const app = new App();

describe('Hero section.', () => {

    before(async () => {
        await app.page('Home').get();
        await app.page('Home').asserts.opened();
    });

    it('Verification that hero section is displayed', async () => {
        await app.page('Home').infoBlock.asserts.visible();
    });

    it('Verification redirecting to Docs page', async () => {
        await app.page('Home').infoBlock.startedBtn.click();
        await app.page('Docs').asserts.opened();

        // await app.page('Home').asserts.not.opened(); // example of a negative assert
    });
});
