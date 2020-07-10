import {BaseElement} from '../BaseElement';
import {page} from '../../../core/puppeteer/Runner';

export class InputElement extends BaseElement {

    public async clear() {
        await this.click({clickCount: 3});
        return page.keyboard.press('Backspace');
    }

    public async setValue(value: string, options?: { delay: number }) {
        await this.wait.visible();
        await this.clear();
        const element = await this.getSingleElement();
        return element.type(value, options);
    }
}
