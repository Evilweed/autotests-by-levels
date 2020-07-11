const {BeforeAll, Before, setDefaultTimeout, After, Status} = require('cucumber');
const {protractor} = require('protractor');
const {existsSync, mkdirSync, createWriteStream} = require('fs');
const {getPage} = require('../po/pages');

setDefaultTimeout(70000);

BeforeAll(() => getPage('Home').get());

Before({tag: '@smoke and @user\\(Pro\\)', timeout: 80000}, ({pickle}) => {
    pickle.tags.find(({name}) => name.match(/@add\(\d+\)/));
});

Before({tag: '@smoke', timeout: 80000}, ({pickle}) => {
    pickle.tags.find(({name}) => name.match(/@add\(\d+\)/));
});

// After(data => console.log(data));

After(async function ({result, pickle}) {
    if (result.status === Status.FAILED) {

        const fileName = `${pickle.name.replace(/ /gm, '_')}_${new Date().getTime()}`,
            screenDirPath = './artifacts/screenshots',
            screenFilePath = `${screenDirPath}/${fileName}.png`;

        const screenShot = await protractor.browser.takeScreenshot();

        existsSync(screenDirPath) || mkdirSync(screenDirPath, {recursive: true});
        const decodedImage = Buffer.from(screenShot, 'base64');

        const stream = createWriteStream(screenFilePath);
        stream.write(decodedImage);
        stream.end();

        return this.attach(decodedImage, "image/png");
    }
});
