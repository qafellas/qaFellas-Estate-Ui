import allure from 'allure-commandline'

export const config = {
    runner: 'local',
    specs: [
        './test/specs/1-homePageTests.spec.js',
        './test/specs/2-signInPageTests.spec.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 1,

    capabilities: [
        {
            browserName: 'chrome',
            browserVersion: '124.0.6367.209',
            "goog:chromeOptions": {
                args: [
                    //'--headless',
                    '--start-maximized',
                    '--incognito'
                ]
            }
        },
        // {
        //     browserName: 'firefox'
        // },
        //  {
        //     browserName: 'MicrosoftEdge'
        // }
    ],

    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',

    bail: 0,
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    framework: 'mocha',

    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },


    // onPrepare: function (config, capabilities) {
    // },

    // beforeSession: function (config, capabilities, specs, cid) {
    // },

    // before: function (capabilities, specs) {
    // },

    // beforeSuite: function (suite) {
    // },

    // beforeTest: function (test, context) {
    // },

    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot();
        }
    },

    // after: function (result, capabilities, specs) {
    // },

    onComplete: function (exitCode, config, capabilities, results) {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },

}
