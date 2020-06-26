import {Ptor} from 'protractor';
import {BasePage} from '../BasePage';

export class DocsPage extends BasePage {
    constructor(protractor: Ptor) {
        super(protractor, protractor.$('#docs'), '/docs');
    }
}
