import {Puppeteer} from '../../../core/puppeteer/Puppeteer';
import {Logger} from '../../Logger';
import {allure} from 'allure-mocha/runtime';
import {BasePage} from '../../../po/pages/BasePage';
import {BaseAsserts} from '../../../asserts/BaseAsserts';
import {WaitHelper} from '../../WaitHelper';

const logger = Logger('Step decorator');

/**
 * This decorator is necessary to have readable state of steps within both allure and console.
 */
export function step() {
    return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
        const targetName = target.constructor.name.toLowerCase();
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any) {
            let message: string;

            if (targetName.includes('asserts')) {
                const that = this as BaseAsserts;
                const {selector} = that.rootEl;

                // @ts-ignore due to 'isPositive' is a private field
                const {isPositive} = that;
                // @ts-ignore due to 'puppeteer' is a private field
                const {name} = that.puppeteer.constructor;

                message = `Check that "${name}" element with "${selector}" selector ${isPositive ? 'is' : 'isn"t'} "${propertyKey}"`;

                // @ts-ignore due to 'basePage' is a private field
                if (that.basePage) {
                    // @ts-ignore due to 'basePage' is a private field
                    const {url} = that.basePage;
                    message = `Check that "${name}" page with url "${url}" and "${selector}" selector ${isPositive ? 'is' : 'isn"t'} "${propertyKey}"`;
                }

            } else if (targetName.includes('wait')) {
                const that = this as WaitHelper;
                const {selector} = that.rootEl;

                // @ts-ignore due to 'puppeteer' is a private field
                const {name} = that.puppeteer.constructor;

                message = `Wait "${propertyKey}" ${name} element with "${selector}" selector`;
            } else if (targetName.includes('page')) {
                const that = this as BasePage;
                const {selector} = that.rootEl;
                const {url} = that;

                message = `The "${that.constructor.name}" page with "${selector}" selector and "${url}" executes "${propertyKey}" command`;
            } else {
                message = `The "${this.constructor.name}" with "${(this as Puppeteer).rootEl.selector}" selector executes "${propertyKey}" command`;
            }

            // tslint:disable-next-line:no-console
            console.log('\t', message);
            logger.debug(message);
            return allure.step(message, () => originalMethod.call(this, ...args));
        };

        return descriptor;
    };
}
