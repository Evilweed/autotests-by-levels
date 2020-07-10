import {BasePage} from '../BasePage';

export class DocsPage extends BasePage {
    constructor() {
        super({selector: '#docs'}, '/docs');
    }
}
