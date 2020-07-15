const {reporters} = require('mocha');
const {config} = require('../../../puppeteer.conf');

function Reporter(name) {
    try {
        return require(name);
    } catch (err) {
        if (!/Cannot find/.exec(err.message)) {
            throw err;
        }
        return null;
    }
}

module.exports = function (runner) {

    reporters.Base.call(this, runner);

    // multiple reporting
    new reporters.Spec(runner);

    for (const report in config.mocha.reporterOptions) {

        if (config.mocha.reporterOptions.hasOwnProperty(report)) {
            new (Reporter(report))(runner, {
                reporterOptions: config.mocha.reporterOptions[report].reporterOptions
            });
        }
    }
}
