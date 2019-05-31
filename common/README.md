# /* @echo name */

An app using dumber bundler to build. More details in `tasks/*.js` (loaded by `gulpfile.js`).

## Run in dev mode, plus watch
```
npm start
```

## Run in production mode, plus watch

It updates index.html with hashed file name.
```
npm run start:prod
```

## Build in dev mode

Generates `scripts/*-bundle.js`
```
npm run build:dev
```

## Build in production mode

Generates `scripts/*-bundle.[hash].js`, update index.html with hashed file name.
```
npm run build
```

## To clear cache

Clear tracing cache by dumber/* @if babel */, and transpiling cache by gulp-cache/* @endif */.
```
npm run clear-cache
```
// @if babel
If you touch `.babelrc` file, you'd better do clear cache.
// @endif

// @if jest || ava
## Nodejs test
```
npm test
```

Details in package.json -> scripts -> pretest & test.
// @endif
// @if jasmine || tape
## Headless browser (electron) test
```
npm test
```

Details in package.json -> scripts -> pretest & test.

1. no karma, no hacking, just browser-run (tape-run wraps browser-run).
2. note `| tap-dot` is optional, `tap-dot` is just a tap result formatter to please the eyes.
// @if jasmine
3. uses jasmine tap reporter so we can pipe the result to tape-run to return proper return-code to terminal.
// @endif

Read more in `tasks/build.js`.

## Visible browser (chrome) test
```
npm run browser-test
```
// @if jasmine
Note in visible browser test, we are feeding browser-run with SpecRunner.html instead of entry-bundle.js because we need jasmine css (in SpecRunner.html) for proper rendering.
// @endif
// @endif
