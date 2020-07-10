const {config} = require('./puppeteer.conf');
const {Logger} = require('./src/helpers/Logger');

const logger = Logger('Mocha-Run');

logger.debug('Mocha config', config.mocha);

module.exports = config.mocha;
