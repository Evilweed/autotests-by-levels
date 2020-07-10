import {Puppeteer} from '../../core/puppeteer/Puppeteer';
import {page} from '../../core/puppeteer/Runner';
import {DirectNavigationOptions} from 'puppeteer';
import {config} from '../../../puppeteer.conf';
import {PageAsserts} from '../../asserts/PageAsserts';
import {IRootEl} from '../../helpers/SelectorHelper';
import {HeaderBlock} from '../blocks/header/HeaderBlock';

export abstract class BasePage extends Puppeteer {

    public readonly header: HeaderBlock;

    public readonly asserts: PageAsserts;

    protected constructor(rootEl: IRootEl, public readonly url: string) {
        super(rootEl);
        this.header = new HeaderBlock();
        this.asserts = new PageAsserts(this);
    }

    public get(url = config.baseUrl + this.url, options?: DirectNavigationOptions) {
        return page.goto(url, options);
    }
}
