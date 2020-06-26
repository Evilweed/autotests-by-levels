const {Given, When, Then} = require('cucumber');
const {getPage} = require('../po/pages');
const {expect} = require('chai');

Given(/^I am on '(.*)' page$/, page => getPage(page).get());

When(/Step/, ({rawTable}) => {
    console.log(rawTable);
});

Then(/^I should (not )?be on '(.*)' page$/, async (not, page) => {
    const isOpened = await getPage(page).isOpened();
    return expect(isOpened).to.be.equal(!not);
});

When(/^I execute search for '(.*)' search term on the '(.*)' page$/, (term, page) => {
    return getPage(page).header.executeSearch(term);
});
