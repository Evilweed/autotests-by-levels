const {configure, getLogger} = require('log4js');

configure({
    appenders: {
        file: {
            type: "file",
            filename: "app.log"
        },
        console: {
            type: "stdout",
            layout: {
                type: "coloured",
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

const Logger = namespace => getLogger(namespace);

module.exports = {
    Logger
}
