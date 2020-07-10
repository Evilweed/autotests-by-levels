import {Puppeteer} from '../../core/puppeteer/Puppeteer';
import {ElementAsserts} from '../../asserts/ElementAsserts';
import {IRootEl} from '../../helpers/SelectorHelper';

export class BaseElement extends Puppeteer {

    public readonly asserts: ElementAsserts;

    constructor(rootEl: IRootEl) {
        super(rootEl);
        this.asserts = new ElementAsserts(this);
    }
}
