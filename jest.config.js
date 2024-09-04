/** @type {import('jest').Config} */

const config = {
  preset: "ts-jest",
  verbose: true,
  testEnvironment: "node",
  roots: ["<rootDir>"],
  testMatch: [
    "<rootDir>/__tests__/**/*.+(ts|tsx|js)",
    "<rootDir>/**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/packages/", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

module.exports = config;
