import {Protractor} from '../../core/protractor/Protractor';
import {ElementArrayFinder, ElementFinder, Ptor} from 'protractor';
import {ElementAsserts} from '../../asserts/ElementAsserts';

export class BaseElement extends Protractor {

    public asserts: ElementAsserts;

    constructor(protractor: Ptor, rootEl: ElementFinder | ElementArrayFinder) {
        super(protractor, rootEl);
        this.asserts = new ElementAsserts(this);
    }

    public get(number: number) {
        return this.rootEl.get(number);
    }
}
