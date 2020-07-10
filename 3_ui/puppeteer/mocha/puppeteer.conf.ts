import {LaunchOptions} from 'puppeteer';
import {Configuration} from 'log4js';
import {MochaOptions} from 'mocha';
import {argv} from './yargs.conf';

interface IExtendedMocha extends MochaOptions {
    readonly spec: string[];
    readonly files?: string[];
    readonly require?: string[];
    readonly parallel?: boolean;
    readonly jobs?: number;
}

interface IConf {
    readonly timeout: typeof TIMEOUT;
    readonly baseUrl: string;
    readonly puppeteer: LaunchOptions;
    readonly log4js: Configuration;
    readonly mocha: IExtendedMocha;
}

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
    baseUrl: argv.baseUrl || '',

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
        reporter: 'spec',
        ui: 'bdd',
        timeout: TIMEOUT.min * 2,
        slow: TIMEOUT.min,
        // parallel: false,
        // jobs: 2
    },

    log4js: {
        appenders: {
            file: {
                type: 'file',
                filename: 'app.log'
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
