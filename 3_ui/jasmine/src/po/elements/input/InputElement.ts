import {BaseElement} from '../BaseElement';

export class InputElement extends BaseElement {

    public clear() {
        return this.rootEl.clear();
    }

    public async setValue(value: string | number) {
        await this.clear();
        return this.rootEl.sendKeys(value);
    }
}
