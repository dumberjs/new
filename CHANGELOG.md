# [0.10.0](https://github.com/dumberjs/new/compare/v0.9.1...v0.10.0) (2020-04-30)


### Bug Fixes

* **ava:** fix ava setup for no-framework ([81ee963](https://github.com/dumberjs/new/commit/81ee963e1df6c74a12c9ddd0683bb081c9a19bd2))
* **no-framework:** fix tests for no-framework option ([182cefe](https://github.com/dumberjs/new/commit/182cefe3a5e2a11f03828c45577ff3fe5037d0bc))
* **react:** cleanup lint error ([604fc47](https://github.com/dumberjs/new/commit/604fc478d0f0189c97f49a35fc996221ff0f7c38))
* **react:** remove tslint ([8e24448](https://github.com/dumberjs/new/commit/8e244486768fcf8fabc7da813e2f5b5ab8f4a653))
* **typescript:** add resolveJsonModule ([6ada295](https://github.com/dumberjs/new/commit/6ada295100c188873367a4f43d48c10cbced3892))
* **typescript:** fix tsconfig include ([2511261](https://github.com/dumberjs/new/commit/251126184ef8ecfba6ddf9fbcf593699100f1445))
* **typescript:** remove unneeded dep ([06e26d2](https://github.com/dumberjs/new/commit/06e26d2bd3a07c987b124ccc87399aad1aafd356))
* add node ts type when using jasmine ([4dd5f6f](https://github.com/dumberjs/new/commit/4dd5f6f58095f0f72ac18033f6d804c1f6a4f006))
* fix cypress/jasmine/jest ts type conflicts ([ec2f6c5](https://github.com/dumberjs/new/commit/ec2f6c583215a247c5b149b06bb5eccbeb70d5eb))
* fix eslint ext ([55e5608](https://github.com/dumberjs/new/commit/55e5608ea33947843bd88db0372300066f8775cf))
* fix plugin gitignore ([1f82882](https://github.com/dumberjs/new/commit/1f8288240281606462a21214e0a525aa80be1b72))
* fix plugin watch mode ([0823ef9](https://github.com/dumberjs/new/commit/0823ef937dade4e148746304cd1067ae315fd4d6))
* recreate typescript.createProject to avoid gulp.watch edge case ([458867c](https://github.com/dumberjs/new/commit/458867c4d268c50a8e98c527d4386dca32939ea9))
* should reject error in test mode ([eca08df](https://github.com/dumberjs/new/commit/eca08df396701f73728116e14897b00730c97c4e))


### Features

* **tape:** upgrade to tape v5 ([ec77ff4](https://github.com/dumberjs/new/commit/ec77ff492ddde1e512b7eb10bfc5b80032b3c08e))
* add no-framework ([537a01e](https://github.com/dumberjs/new/commit/537a01e57a8867525465e4f95bba66efaedd860f))
* switch from libsass to dart-sass ([7b9cd24](https://github.com/dumberjs/new/commit/7b9cd2436d6cea9867c9e6615433fc51ea04be83))



## [0.9.1](https://github.com/dumberjs/new/compare/v0.9.0...v0.9.1) (2020-03-13)


### Bug Fixes

* babel-jest doesn't read .babelrc ([94c1e90](https://github.com/dumberjs/new/commit/94c1e906a630531ed6ae1cb96986945e5b91c4ea))
* fix evergreen browser list ([5c02c60](https://github.com/dumberjs/new/commit/5c02c60a98117a0813d7921f8211d296afb47fca))
* fix missing dep ([a6fa41b](https://github.com/dumberjs/new/commit/a6fa41b702110b0ab8434a4c5ef9665a7c4588b2))
* fix vue-jest babel bug ([e569e7e](https://github.com/dumberjs/new/commit/e569e7e05defe5cdb82b5e8c6cd30613a773e30e))
* remove vue-jest from non-jest setup  ([b4619d8](https://github.com/dumberjs/new/commit/b4619d830b6e75003ed249af56e1c74ffa2975c2))
* retain dynamic import ([61a8768](https://github.com/dumberjs/new/commit/61a876882029f17bbfa2b16ed453c330981fded1))


### Features

* support browser choice, ie or evergreen ([730358e](https://github.com/dumberjs/new/commit/730358ebcadb91c7fc46441f5e2d39a4bc0da816))



# [0.9.0](https://github.com/dumberjs/new/compare/v0.8.0...v0.9.0) (2020-02-16)


### Bug Fixes

* fix sourcemap for browser test ([dcad468](https://github.com/dumberjs/new/commit/dcad468973c2c9589698e21e5bb51b14cdb89a22))
* plugin needs a main ([d265f94](https://github.com/dumberjs/new/commit/d265f9474b46a1859c13bc6338a9028fe6fcf9cc))
* plugin needs to publish dist files ([fd6a451](https://github.com/dumberjs/new/commit/fd6a451c15e32a59a73a048db591842a7efad268))
* turn of minification in aurelia plugin ([bf6fb31](https://github.com/dumberjs/new/commit/bf6fb3104e3a97db1227afeb344e1cbfe6abc499))



# [0.8.0](https://github.com/dumberjs/new/compare/v0.7.0...v0.8.0) (2019-10-16)


### Features

* default aurelia deps are now added by aurelia-deps-finder ([3293871](https://github.com/dumberjs/new/commit/3293871f3fba30b533cf9ec8bdc3fe1cfde3b877))



# [0.7.0](https://github.com/dumberjs/new/compare/v0.6.0...v0.7.0) (2019-08-09)


### Features

* get rid of gulp-preprocess, use latest dumber feature on process.env.NODE_ENV ([24dd7f0](https://github.com/dumberjs/new/commit/24dd7f0))



# [0.6.0](https://github.com/dumberjs/new/compare/v0.5.0...v0.6.0) (2019-07-31)


### Bug Fixes

* be nice to windows ([03161db](https://github.com/dumberjs/new/commit/03161db))
* fix ava css module stub ([14142cb](https://github.com/dumberjs/new/commit/14142cb))
* fix guide on here mode ([a8f4dd9](https://github.com/dumberjs/new/commit/a8f4dd9))
* fix json format ([0f71f79](https://github.com/dumberjs/new/commit/0f71f79))
* fix vue ava unit tests ([15e5fe5](https://github.com/dumberjs/new/commit/15e5fe5))
* hide ava for vue-sfc, it doesn't work yet ([427296b](https://github.com/dumberjs/new/commit/427296b))


### Features

* code coverage support for babel+browser-do setup ([72447cd](https://github.com/dumberjs/new/commit/72447cd))
* turn on ava option, dumber now supports `import 'a.less';` ([029d90f](https://github.com/dumberjs/new/commit/029d90f))



# [0.5.0](https://github.com/dumberjs/new/compare/v0.4.0...v0.5.0) (2019-06-19)


### Bug Fixes

* fix mocha tests, remove tap-dot ([bbbed7b](https://github.com/dumberjs/new/commit/bbbed7b))
* fix wrong browser-test script ([5a28223](https://github.com/dumberjs/new/commit/5a28223))


### Features

* display "Get Started" guide in after task ([c1f19b6](https://github.com/dumberjs/new/commit/c1f19b6))
* use browser-do, add mocha support ([d332318](https://github.com/dumberjs/new/commit/d332318))



# [0.4.0](https://github.com/dumberjs/new/compare/v0.3.0...v0.4.0) (2019-05-24)


### Bug Fixes

* update to latest makes 0.7.0 run() ([feb41e8](https://github.com/dumberjs/new/commit/feb41e8))


### Features

* normalise common tasks to npm scripts ([0c61b04](https://github.com/dumberjs/new/commit/0c61b04))
* print hint of silent mode ([9a067ae](https://github.com/dumberjs/new/commit/9a067ae))



# [0.3.0](https://github.com/dumberjs/new/compare/v0.2.0...v0.3.0) (2019-05-16)


### Bug Fixes

* fix syntax ([c59b674](https://github.com/dumberjs/new/commit/c59b674))
* use absolute path for requirejs baseUrl ([d1e2d2d](https://github.com/dumberjs/new/commit/d1e2d2d))


### Features

* "after" task to optionally install deps ([2e53df3](https://github.com/dumberjs/new/commit/2e53df3))
* make gulpfile more adaptive ([dfddf94](https://github.com/dumberjs/new/commit/dfddf94))
* vue skeleton ([0439a9d](https://github.com/dumberjs/new/commit/0439a9d))



# [0.2.0](https://github.com/dumberjs/new/compare/v0.1.0...v0.2.0) (2019-05-13)


### Bug Fixes

* fix babel config ([408ee41](https://github.com/dumberjs/new/commit/408ee41))


### Features

* enable cypress e2e tests ([4fa72b1](https://github.com/dumberjs/new/commit/4fa72b1))
* react skeleton, simplify aurelia skeleton ([1a966f0](https://github.com/dumberjs/new/commit/1a966f0))



# 0.1.0 (2019-04-28)


### Bug Fixes

* add missing value for sfv choice ([9a06f76](https://github.com/dumberjs/new/commit/9a06f76))
* bypass raw preprocess syntax ([173dfb3](https://github.com/dumberjs/new/commit/173dfb3))


### Features

* aurelia skeletons tests ([69227ee](https://github.com/dumberjs/new/commit/69227ee))
* mark Aurelia skeletons as implemented ([0fe605f](https://github.com/dumberjs/new/commit/0fe605f))




