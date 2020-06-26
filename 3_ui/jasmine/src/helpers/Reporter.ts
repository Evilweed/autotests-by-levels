import CustomReporter = jasmine.CustomReporter;
import CustomReporterResult = jasmine.CustomReporterResult;
import {Allure, ContentType} from 'allure-js-commons';
import {protractor} from 'protractor';
import {existsSync, mkdirSync, writeFileSync} from 'fs';
import {join, resolve} from 'path';

export interface IScreenshotReporter {
    path: string;
    failed?: boolean;
    success?: boolean;
    all?: boolean;
    allure?: Allure;
}

enum TestStatus {
    failed = 'failed',
    pending = 'pending',
    disabled = 'disabled',
    skipped = 'skipped'
}

export class ScreenshotReporter implements CustomReporter {

    private promise?: Promise<any>;

    constructor(private readonly config: IScreenshotReporter) {
    }

    jasmineStarted(_suiteInfo: jasmine.SuiteInfo) {
        afterEach(async () => {

            if (this.promise) {
                await this.promise;
            }
            this.promise = undefined;
        });

        afterAll(async () => {
            if (this.promise) {
                await this.promise;
            }
            this.promise = undefined;
        });
    }

    public specDone(result: CustomReporterResult) {

        if (
            this.config.all
            || this.config.success
            || this.config.failed && result.status === TestStatus.failed
        ) {

            const takeScreen = async () => {
                const png = await protractor.browser.takeScreenshot();
                const name = `${new Date().valueOf()}_PID_${process.pid}_${result.fullName.replace(/ /gm, '_')}.png`;
                const buffer = Buffer.from(png, 'base64');
                const fullPath = resolve(join(process.cwd(), this.config.path));

                if (this.config.allure) {
                    this.config.allure.createAttachment(name, buffer, ContentType.PNG);
                }

                if (!existsSync(fullPath)) {
                    mkdirSync(fullPath, {recursive: true});
                }

                writeFileSync(join(fullPath, name), buffer);
            };

            this.promise = takeScreen();
        }
    }
}
