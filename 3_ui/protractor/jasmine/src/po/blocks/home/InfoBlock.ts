import {ElementArrayFinder, ElementFinder, Ptor} from 'protractor';
import {BaseBlock} from '../BaseBlock';
import {BaseElement} from '../../elements/BaseElement';
import {ButtonElement} from '../../elements/button/ButtonElement';

export class InfoBlock extends BaseBlock {
    constructor(protractor: Ptor, rootEl: ElementFinder | ElementArrayFinder) {
        super(protractor, rootEl.$('#intro'));
    }

    get logo() {
        return new BaseElement(this.protractor, this.rootEl.$('.hero-logo'));
    }

    get startedBtn() {
        return new ButtonElement(this.protractor, this.rootEl.$('.button.hero-cta'));
    }
}
