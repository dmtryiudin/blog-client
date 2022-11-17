module.exports = {
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
        '^react-dnd$': 'react-dnd/dist/cjs',
        '^react-dnd-html5-backend$': 'react-dnd-html5-backend/dist/cjs',
        '^dnd-core$': 'dnd-core/dist/cjs',
    },
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    transformIgnorePatterns: [
        'node_modules/(?!' +
        [
            'axios',
            '@here/maps-api-for-javascript',
        ].join('|') +
        ')',
    ],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [ "<rootDir>/src/setupTests.js" ],
    setupFiles: [
        "./__mocks__/client.js"
    ],
};