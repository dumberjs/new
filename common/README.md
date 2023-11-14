# /* @echo name */

An app using dumber bundler to build. More details in `gulpfile.js`.

## Run in dev mode, plus watch

    npm start

// @if !plugin
## Run in production mode, plus watch

It updates index.html with hashed file name.

    npm run start:prod

## Build in dev mode

Generates `dist/*-bundle.js`

    npm run build:dev

## Build in production mode

    npm run build

It builds `dist/*-bundle.[hash].js`, updates index.html with hashed js bundle file name. To deploy to production server, copy over both the generated `index.html` and all the `dist/*` files.

For example
```
index.html
dist/entry-bundle.12345.js
```
Copy to production root folder
```
root_folder/index.html
root_folder/dist/entry-bundle.12345.js
```
// @endif
## To clear cache

Clear tracing cache. In rare situation, you might need to run clear-cache after upgrading to new version of dumber bundler.

    npm run clear-cache

// @if jest
## Nodejs test

    npm test

Details in package.json -> scripts -> pretest & test.
// @endif
// @if jasmine || tape || mocha
## Headless browser (electron) test

    npm test

Details in package.json -> scripts -> pretest & test.

## Visible browser (chrome) test

    npm run browser-test

This runs in Chrome, if you want to use other browser, update package.json "browser-test" script. Read [browser-do](https://github.com/3cp/browser-do) for available browsers.

By default, browser-do closes the browser after tests finish, to keep browser running, use `--keep-open` option on browser-do command.
// @endif

// @if jest
## Code coverage

`npm test` already generetes code coverage report, you can open `coverage/lcov-report/index.html` for detailed report.

// @endif
// @if babel && (jasmine || mocha || tape)
## Code coverage

    npm run coverage

Then open `coverage/lcov-report/index.html` for detailed report.

// @if react
> Currently coverage doesn't work for out react setup. To be fixed.
// @endif
// @endif
