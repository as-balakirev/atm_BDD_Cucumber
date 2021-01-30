const path = require('path');
const yargs = require('yargs').argv;
const reporter = require('cucumber-html-reporter');

const reportOptions = {
    theme: 'bootstrap',
    jsonFile: path.join(__dirname, '../reports/report.json'),
    output: path.join(__dirname, '../reports/cucumber-report.html'),
    reportSuiteAsScenarios: true
}

exports.config = {
    allScriptsTimeout: 60000,
    getPageTimeout: 60000,
    specs: [path.resolve('./test/features/**/*.feature')],
    framework: 'custom',
    frameworkPath: require.resolve('@stroiman/protractor-cucumber-framework'),
    capabilities: {
        shardTestFiles: true,
        browserName: 'firefox',
        "moz:firefoxOptions": {
            'args': []
        },
        chromeOptions: {
            args: ['--no-sandbox']
        },
        shardTestFiles: yargs.instances > 1,
        maxInstances: yargs.instances || 1,
    },
    disableChecks: true,
    directConnect: true,
    cucumberOpts: {
        strict: false,
        require: [path.resolve('./test/step_definitions/**/*.js')],
        format: ['json:./test/reports/report.json', './node_modules/@cucumber/pretty-formatter'],
        tags: yargs.tags || '@epam',
    },
    onPrepare: () => {
        browser.driver.manage().window().maximize();
        return browser.waitForAngularEnabled(false);
    },
    afterLaunch: () => {
        return reporter.generate(reportOptions);
    }

}