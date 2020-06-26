import {BaseAsserts} from './BaseAsserts';
import {BaseElement} from '../po/elements/BaseElement';

export class BaseElementAsserts extends BaseAsserts {

    constructor(element: BaseElement) {
        super(element);
    }
}
