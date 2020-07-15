import {LaunchOptions} from 'puppeteer';
import {Configuration} from 'log4js';
import {MochaOptions} from 'mocha';
import {argv} from './yargs.conf';

interface IExtendedMocha extends MochaOptions {
    readonly spec: string[];
    readonly files?: string[];
    readonly require?: string[];
}

interface IConf {
    readonly timeout: typeof TIMEOUT;
    readonly baseUrl: string;
    readonly puppeteer: LaunchOptions;
    readonly artifacts: {
        readonly dir: string;
        readonly screenshots: string;
        readonly har: string;
    };
    readonly log4js: Configuration;
    readonly mocha: IExtendedMocha;
}

const ARTIFACTS_DIR = './artifacts';

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

export const config: IConf = {

    timeout: TIMEOUT,
    baseUrl: argv.baseUrl || 'https://angular.io',

    puppeteer: {
        headless: false,
        defaultViewport: {
            width: 1366,
            height: 768
        },
        args: ['--window-size=1366,768'],
        timeout: TIMEOUT.min
    },

    mocha: {
        spec: [
            './src/tests/**/*.test.ts'
        ],
        require: [
            './src/hooks/Hooks.ts'
        ],
        reporter: './src/helpers/reporter',
        reporterOptions: {
            'mocha-junit-reporter': {
                reporterOptions: {
                    mochaFile: `${ARTIFACTS_DIR}/junit/junit-mocha.xml`
                }
            },
            'allure-mocha': {
                reporterOptions: {
                    resultsDir: `${ARTIFACTS_DIR}/allure/source`,
                }
            }
        },
        ui: 'bdd',
        timeout: TIMEOUT.min * 2,
        slow: TIMEOUT.min,
        parallel: false, // todo reporters work only on single thread mode
        jobs: 2
    },

    artifacts: {
        dir: ARTIFACTS_DIR,
        screenshots: `${ARTIFACTS_DIR}/screenshots/`,
        har: `${ARTIFACTS_DIR}/har/`
    },

    log4js: {
        appenders: {
            file: {
                type: 'file',
                filename: `${ARTIFACTS_DIR}/log4js/${new Date().valueOf()}_PID_${process.pid}_e2e.log`
            },
            console: {
                type: 'stdout',
                layout: {
                    type: 'coloured',
                },
            },
        },
        categories: {
            default: {
                appenders: ['console', 'file'],
                level: argv.logLevel
            }
        }
    }
};
