import {Ptor} from 'protractor';
import {BaseBlock} from '../BaseBlock';
import {InputElement} from '../../elements/input/InputElement';

export class HeaderBlock extends BaseBlock {
    constructor(protractor: Ptor) {
        super(protractor, protractor.$('mat-toolbar'));
    }

    get searchInput() {
        return new InputElement(this.protractor, this.rootEl.$('.search-container input'));
    }

    public executeSearch(value: string) {
        return this.searchInput.setValue(value);
    }
}
