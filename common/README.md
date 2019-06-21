# /* @echo name */

An app using dumber bundler to build. More details in `tasks/*.js` (loaded by `gulpfile.js`).

## Run in dev mode, plus watch

    npm start

## Run in production mode, plus watch

It updates index.html with hashed file name.

    npm run start:prod

## Build in dev mode

Generates `scripts/*-bundle.js`

    npm run build:dev

## Build in production mode

Generates `scripts/*-bundle.[hash].js`, update index.html with hashed file name.

    npm run build

## To clear cache

Clear tracing cache. In rare situation, you might need to run clear-cache after upgrading to new version of dumber bundler.

    npm run clear-cache

// @if jest || ava
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
