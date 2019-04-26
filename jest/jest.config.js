module.exports = {
  // @if aurelia
  // This is to teach jest(actually NODE_PATH) where to load an aurelia module,
  // when aurelia-loader requests module "a/b",
  // jest will try src/a/b.js.
  modulePaths: [
    "<rootDir>/src",
    "<rootDir>/node_modules"
  ],
  testEnvironment: "node",
  // @endif

  // @if typescript
  preset: 'ts-jest',
  // @endif

  // To load aurelia-loader-nodejs and aurelia-pal-browser
  setupFiles: [
    "<rootDir>/test/setup./* @if babel */js/* @endif *//* @if typescript */ts/* @endif */"
  ],

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*./* @if babel */js/* @endif *//* @if typescript */ts/* @endif */']
};
