const {argv} = require('./yargs.conf');
const {existsSync, mkdirSync} = require('fs');

const cucumberArtifactsDir = './artifacts/cucumber';

module.exports.config = {

    baseUrl: 'https://angular.io',
    directConnect: false,
    ignoreUncaughtExceptions: true,
    getPageTimeout: 20000,
    allScriptsTimeout: 30000,

    specs: [
        './src/features/**/*.feature'
    ],

    capabilities: {
        browserName: 'chrome',
        shardTestFiles: argv.parallel > 1,
        maxInstances: argv.parallel
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    cucumberOpts: {
        require: [
            './src/hooks/**/*.js',
            './src/step_definitions/**/*.js'
        ],
        format: [
            `json:${cucumberArtifactsDir}/cucumber.json`,
            'node_modules/cucumber-pretty',
            `node_modules/cucumber-junit-formatter:${cucumberArtifactsDir}/junit.xml`
        ],
        tags: ['not @wip'] // add argv.tags
    },

    async onPrepare() {
        const {protractor} = require('protractor');

        existsSync(cucumberArtifactsDir) || mkdirSync(cucumberArtifactsDir, {recursive: true});

        await protractor.browser.waitForAngularEnabled(true);
        return protractor.browser.manage().window().setSize(1920, 1080);
    }
}
