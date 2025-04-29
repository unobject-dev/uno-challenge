module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/db.js'
  ],
  coverageThreshold: {
    global: { branches: 95, functions: 60, lines: 60, statements: 60 }
  }
};
