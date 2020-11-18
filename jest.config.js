module.exports = {
  roots: ['<rootDir>'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/dist/'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
  // setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}
