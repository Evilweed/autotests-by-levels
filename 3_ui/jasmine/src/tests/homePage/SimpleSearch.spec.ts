import {protractor} from 'protractor';
import {HomePage} from '../../po/pages/home/HomePage';

const homePage = new HomePage(protractor);

describe('Simple search.', () => {

    beforeEach(async () => {
        await homePage.get();
    });

    it('Executing simple search', async () => {
        await homePage.header.asserts.displayed();
        await homePage.header.executeSearch('protractor');
    });
});
