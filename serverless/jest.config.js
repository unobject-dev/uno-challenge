module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.js',
      '!src/server.js',
      '!src/db.js'
    ],
    coverageThreshold: {
      global: { branches: 80, functions: 80, lines: 80, statements: 80 }
    }
  };
  