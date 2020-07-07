const {generate} = require('cucumber-html-reporter');
const {readdirSync, readFileSync, writeFileSync} = require('fs');

const cucumberDirPath = './artifacts/cucumber/'

const dirContent = readdirSync(cucumberDirPath);
const jsonFileNames = dirContent.filter(file => file.match(/^cucumber.(\d+).json$/));

if (jsonFileNames) {
    const jsonReport = [];

    for (const jsonFileName of jsonFileNames) {
        const content = readFileSync(cucumberDirPath + jsonFileName, {encoding: 'utf8'});
        jsonReport.push(JSON.parse(content)[0]);
    }

    writeFileSync(`${cucumberDirPath}cucumber.json`, JSON.stringify(jsonReport, null, '  '));
}

const options = {
    theme: 'bootstrap',
    jsonFile: './artifacts/cucumber/cucumber.json',
    // jsonDir: './artifacts/cucumber/', jsonFile takes precedence over jsonDir
    output: './artifacts/html/report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,
    brandTitle: 'E2E UI',
    metadata: {
        'App Version': '1.0.0',
        'Test Environment': 'PRD',
        'Browser': 'Chrome 83.0.4103.97',
        'Platform': 'Windows 10',
        'Parallel': 'Scenarios',
        'Executed': 'Local'
    }
};

generate(options);
