// @ts-ignore
import Reporters = require('jasmine-reporters');
import {SpecReporter, StacktraceOption} from 'jasmine-spec-reporter';
import {JasmineAllureReporter} from 'allure-jasmine';
import {ScreenshotReporter} from './src/helpers/Reporter';

export const specReporter = new SpecReporter({
    spec: {
        displayStacktrace: StacktraceOption.NONE,
        displayDuration: true
    },
    summary: {
        displayStacktrace: StacktraceOption.PRETTY,
        displayDuration: true
    },
    colors: {
        enabled: true
    }
});

export const jUnitXmlReporter = new Reporters.JUnitXmlReporter({
    savePath: './artifacts/junit',
    consolidateAll: true
});

export const jasmineAllureReporter = new JasmineAllureReporter({
    resultsDir: './artifacts/allure/source',
});

export const screenshotReporter = new ScreenshotReporter({
    allure: jasmineAllureReporter.getInterface(),
    path: './artifacts/screenshot/',
    failed: true
});
