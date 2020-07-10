import {BasePage} from './po/pages/BasePage';
import {DocsPage} from './po/pages/docs/DocsPage';
import {HomePage} from './po/pages/home/HomePage';

type THome = 'home' | 'Home';
type TDocs = 'docs' | 'Docs';
type TPage = THome | TDocs;

export class App {

    private docsPage!: DocsPage;
    private homePage!: HomePage;

    public page(name: TDocs): DocsPage;
    public page(name: THome): HomePage;
    public page(name: TPage): BasePage {
        switch (name) {
            case 'Docs':
            case 'docs':
                if (!this.docsPage) {
                    this.docsPage = this.getPageInstance(DocsPage);
                }
                return this.docsPage;
            case 'Home':
            case 'home':
                if (!this.homePage) {
                    this.homePage = this.getPageInstance(HomePage);
                }
                return this.homePage;
        }

    }

    private getPageInstance<T extends BasePage>(page: new () => T): T {
        return new page();
    }
}
