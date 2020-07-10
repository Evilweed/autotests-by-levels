import {BasePage} from '../BasePage';
import {InfoBlock} from '../../blocks/home/InfoBlock';

export class HomePage extends BasePage {
    public readonly infoBlock: InfoBlock;

    constructor() {
        super({selector: '#home'}, '');
        this.infoBlock = new InfoBlock(this.rootEl);
    }
}
