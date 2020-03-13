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




