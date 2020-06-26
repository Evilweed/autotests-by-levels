import {Protractor} from '../../core/protractor/Protractor';
import {ElementArrayFinder, ElementFinder, Ptor} from 'protractor';
import {BaseElementAsserts} from '../../asserts/BaseElementAsserts';

export class BaseElement extends Protractor {

    public asserts: BaseElementAsserts;

    constructor(protractor: Ptor, rootEl: ElementFinder | ElementArrayFinder) {
        super(protractor, rootEl);
        this.asserts = new BaseElementAsserts(this);
    }

    public get(number: number) {
        return this.rootEl.get(number);
    }
}
