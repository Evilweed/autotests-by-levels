import {configure, getLogger} from 'log4js';

configure({
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
            level: 'info'
        }
    }
});

export const Logger = (namespace: string) => getLogger(namespace);
