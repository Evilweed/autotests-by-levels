import {BaseBlock} from '../BaseBlock';
import {InputElement} from '../../elements/input/InputElement';
import {step} from '../../../helpers/reporter/step';

export class HeaderBlock extends BaseBlock {
    constructor() {
        super({selector: 'mat-toolbar'});
    }

    get searchInput() {
        return new InputElement(this.$('.search-container input'));
    }

    @step()
    public executeSearch(value: string) {
        return this.searchInput.setValue(value);
    }
}
