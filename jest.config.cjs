module.exports = {
  clearMocks: true,
  setupFilesAfterEnv: ["regenerator-runtime/runtime"],
  testPathIgnorePatterns: ["/node_modules/"],
  useStderr: true,
  testEnvironment: 'jest-environment-node',
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
};
