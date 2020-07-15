import {BasePage} from './po/pages/BasePage';
import {DocsPage} from './po/pages/docs/DocsPage';
import {HomePage} from './po/pages/home/HomePage';
import {HarHelper} from './helpers/HarHelper';
import {config} from '../puppeteer.conf';
import {ScreenshotsHelper} from './helpers/ScreenshotsHelper';
import {memoryHelper} from './helpers/MemoryHelper';
import {getMousePosition} from './helpers/MouseHelper';
import {NetworkHelper} from './helpers/NetworkHelper';
import {Logger} from './helpers/Logger';
import * as log4js from 'log4js';

type THome = 'home' | 'Home';
type TDocs = 'docs' | 'Docs';
type TPage = THome | TDocs;

export class App {

    public readonly screenshots: ScreenshotsHelper;
    public readonly har: HarHelper;
    public readonly network: NetworkHelper;

    public readonly memory: typeof memoryHelper;

    public readonly logger: (namespace: string) => log4js.Logger;

    constructor() {
        this.screenshots = new ScreenshotsHelper(config.artifacts.screenshots);
        this.har = new HarHelper(config.artifacts.har);
        this.network = new NetworkHelper();
        this.memory = memoryHelper;
        this.logger = (namespace: string) => Logger(namespace);
    }

    get mousePosition() {
        return getMousePosition();
    }

    public page(name: TDocs): DocsPage;
    public page(name: THome): HomePage;
    public page(name: TPage): BasePage {
        switch (name) {
            case 'Docs':
            case 'docs':
                return this.getPageInstance(DocsPage);
            case 'Home':
            case 'home':
                return this.getPageInstance(HomePage);
        }
    }

    private getPageInstance<T extends BasePage>(page: new () => T): T {
        return new page();
    }
}
