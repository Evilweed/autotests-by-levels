const yargs = require('yargs');

const {argv} = yargs
    .options({
        tags: {
            description: 'scenarios marked with these tags will be executed',
            demandOption: false,
            type: 'string'
        },
        parallel: {
            description: 'count of threads to run tests',
            demandOption: true,
            type: 'number',
            default: 1
        },
    })
    .help();

module.exports = {
    argv
};
