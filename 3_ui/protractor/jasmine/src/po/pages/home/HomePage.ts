import {Ptor} from 'protractor';
import {BasePage} from '../BasePage';
import {InfoBlock} from '../../blocks/home/InfoBlock';

export class HomePage extends BasePage {

    public readonly infoBlock: InfoBlock;

    constructor(protractor: Ptor) {
        super(protractor, protractor.$('#home'), '/');
        this.infoBlock = new InfoBlock(this.protractor, this.rootEl);
    }
}
