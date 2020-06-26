import {ElementFinder, Ptor} from 'protractor';
import {Protractor} from '../../core/protractor/Protractor';
import {HeaderBlock} from '../blocks/header/HeaderBlock';
import {BasePageAsserts} from '../../asserts/BasePageAsserts';

export abstract class BasePage extends Protractor {

    public readonly header: HeaderBlock;
    public readonly asserts: BasePageAsserts;

    public readonly baseUrl: string;

    protected constructor(protractor: Ptor, rootEl: ElementFinder, public readonly url: string) {
        super(protractor, rootEl);
        this.baseUrl = this.protractor.browser.baseUrl;
        this.header = new HeaderBlock(this.protractor);
        this.asserts = new BasePageAsserts(this);
    }

    public get(url = this.url) {
        return this.browser.get(url);
    }

    public getCurrentUrl() {
        return this.browser.getCurrentUrl();
    }
}
