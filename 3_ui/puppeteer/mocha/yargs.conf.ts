import * as yargs from 'yargs';

export const {argv} = yargs
    .options({
        logLevel: {
            description: 'level of displayed logs',
            demandOption: true,
            choices: ['info', 'trace', 'debug', 'warn', 'error', 'all', 'fatal', 'off'],
            type: 'string',
            default: 'info'
        },
        baseUrl: {
            description: 'base url',
            demandOption: false,
            type: 'string'
        }
    })
    .help();
