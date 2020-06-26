import {Config, protractor} from 'protractor';
import {
    jasmineAllureReporter,
    jUnitXmlReporter,
    screenshotReporter,
    specReporter
} from './reporter.conf';

export const config: Config = {

    baseUrl: 'https://angular.io',
    directConnect: false,
    ignoreUncaughtExceptions: true,
    getPageTimeout: 20000,
    allScriptsTimeout: 30000,

    specs: [
        './src/tests/**/*.ts'
    ],

    capabilities: {
        browserName: 'chrome'
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 70000,
        includeStackTrace: true,
        isVerbose: true,
    },

    async onPrepare() {
        jasmine.getEnv().addReporter(screenshotReporter);
        jasmine.getEnv().addReporter(specReporter);
        jasmine.getEnv().addReporter(jUnitXmlReporter);
        jasmine.getEnv().addReporter(jasmineAllureReporter);

        await protractor.browser.waitForAngularEnabled(true);
        return protractor.browser.manage().window().setSize(1920, 1080);
    }
};
