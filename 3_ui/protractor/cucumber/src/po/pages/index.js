const {protractor} = require('protractor');

const HomePage = require('./home/HomePage');
const DocsPage = require('./docs/DocsPage');

/**
 * @param name {'Home'|'home'|'Docs'|'docs'}
 * @return {BasePage}
 */
const getPage = name => {
    const page = {
        home: HomePage,
        docs: DocsPage
    }

    return new page[name.toLowerCase()](protractor);
}

module.exports = {
    getPage
}
