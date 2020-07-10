import {BaseBlock} from '../BaseBlock';
import {$, IRootEl} from '../../../helpers/SelectorHelper';
import {BaseElement} from '../../elements/BaseElement';
import {ButtonElement} from '../../elements/button/ButtonElement';

export class InfoBlock extends BaseBlock {
    constructor(rootEl: IRootEl) {
        super($(rootEl, '#intro'));
    }

    get logo() {
        return new BaseElement(this.$('.hero-logo'));
    }

    get startedBtn() {
        return new ButtonElement(this.$('.button.hero-cta'));
    }
}
