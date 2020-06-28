import {Config, protractor} from 'protractor';
import {
    jasmineAllureReporter,
    jUnitXmlReporter,
    screenshotReporter,
    specReporter
} from './reporter.conf';

export const TIMEOUT = {
    sec: 1000,
    xss: 2000,
    xs: 3000,
    s: 5000,
    m: 10000,
    l: 20000,
    xl: 30000,
    min: 60000
};

export const config: Config = {

    baseUrl: 'https://angular.io',
    directConnect: false,
    ignoreUncaughtExceptions: true,
    getPageTimeout: TIMEOUT.l,
    allScriptsTimeout: TIMEOUT.xl,

    specs: [
        './src/tests/**/*.ts'
    ],

    capabilities: {
        browserName: 'chrome'
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: TIMEOUT.min,
        includeStackTrace: false,
        isVerbose: false,
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
