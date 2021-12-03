module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/main/**',
        '!<rootDir>/src/test/**'
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'babel',
    testEnvironment: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest'
    }
}