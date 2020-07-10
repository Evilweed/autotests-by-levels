import {before, describe, it} from 'mocha';
import {App} from '../App';

const app = new App();

describe('Simple search.', () => {

    before(async () => {
        await app.page('Home').get();
    });

    it('Executing simple search', async () => {
        await app.page('Home').header.asserts.visible();
        await app.page('Home').header.executeSearch('protractor');
    });
});
