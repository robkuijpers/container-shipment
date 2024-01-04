module.exports = {
    testEnvironment: 'node',
    transform: { '^.+\\.ts?$': 'ts-jest' },
    testRegex: '/test/.*\\.(test|spec)?\\.(ts)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    coverageReporters: ['lcov', 'text'],
};
