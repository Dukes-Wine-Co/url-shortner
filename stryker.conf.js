const { version } = require('./package.json');

module.exports = config => {
    config.set({
        allowConsoleColors: true,
        mutator: {
            name: 'javascript',
            plugins: [
                'optionalChaining'
            ],
        },
        packageManager: 'npm',
        reporters: ['html', 'progress', 'dashboard'],
        testRunner: 'command',
        commandRunner: {
            command: 'rm -rf stryker-tmp; npm run test'
        },
        transpilers: [
        ],
        coverageAnalysis: 'all',
        mutate: [
            'src/*.js',
            'src/**/*.js',
            'src/**/**/*.js'
        ],
        dashboard: {
            project: 'github.com/Dukes-Wine-Co/url-shortner/master',
            version,
            reportType: 'full'
        }
    });
};
