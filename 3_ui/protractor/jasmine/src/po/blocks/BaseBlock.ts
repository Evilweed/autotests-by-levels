import {ElementArrayFinder, ElementFinder, Ptor} from 'protractor';
import {BaseElement} from '../elements/BaseElement';

export abstract class BaseBlock extends BaseElement {

    protected constructor(protractor: Ptor, rootEl: ElementFinder | ElementArrayFinder) {
        super(protractor, rootEl);
    }

}
