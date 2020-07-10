import {configure, getLogger} from 'log4js';
import {config} from '../../puppeteer.conf';

configure(config.log4js);

export const Logger = (namespace: string) => getLogger(`${namespace} - PID ${process.pid}`);
