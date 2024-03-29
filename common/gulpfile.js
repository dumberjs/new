const dumber = require('gulp-dumber');
// @if aurelia
const auDepsFinder = require('aurelia-deps-finder');
// @endif
const fs = require('fs');
const gulp = require('gulp');
const del = require('del');
// @if babel
const babel = require('gulp-babel');
// @endif
// @if typescript
const typescript = require('gulp-typescript');
// @endif
// @if less
const less = require('gulp-less');
// @endif
// @if sass
const sass = require('gulp-dart-sass');
const sassPackageImporter = require('node-sass-package-importer');
// @endif
const plumber = require('gulp-plumber');
const merge2 = require('merge2');
const postcss = require('gulp-postcss');
const terser = require('gulp-terser');
const gulpif = require('gulp-if');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const devServer = require('./dev-server');
// @if plugin
const gulpSourcemaps = require('gulp-sourcemaps');
// @endif

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
// @if !plugin
const outputDir = 'dist';
// @endif
// @if plugin
const outputDir = 'scripts';
const pluginOutputDir = 'dist';
// @endif

// Read more in https://dumber.js.org
const dr = dumber({
  // src folder is by default "src".
  // src: 'src',

  // requirejs baseUrl, dumber default is "/dist"
  baseUrl: '/' + outputDir,

  // can turn off cache for production build
  // cache: !isProduction,

  // entry bundle name, dumber default is "entry-bundle"
  // entryBundle: 'entry-bundle',

  // @if aurelia
  // The special depsFinder to teach dumber about the Aurelia convention.
  // Aurelia needs this special treatment because of the heavy convention.
  // No need for other frameworks like React/...
  depsFinder: auDepsFinder,
  // @endif

  // Turn on hash for production build
  hash: isProduction && !isTest,

  // Note prepend/append only affects entry bundle.

  // prepend before amd loader.
  // dumber-module-loader is injected automatically by dumber bundler after prepends.
  prepend: [
    // Promise polyfill for IE
    require.resolve('promise-polyfill/dist/polyfill.min.js')
  ],

  // append after amd loader and all module definitions in entry bundle.
  append: [
    // @if jasmine || tape || mocha
    // Kick off all test files.
    // Note dumber-module-loader requirejs call accepts regex which loads all matched module ids!
    // Note all module ids are relative to dumber option "src" (default to 'src') folder.
    isTest && "requirejs(['../test/setup', /^\\.\\.\\/test\\/.+\\.spec$/]);"
    // @endif
  ],

  // Explicit dependencies, can use either "deps" (short name) or "dependencies" (full name).
  // deps: [
  // ],

  // Code split is intuitive and flexible.
  // https://dumber.js.org/options/code-split
  //
  // You provide a function to return a bundle name for every single module.
  // The function takes two parameters:
  //
  // moduleId:
  //   for local src file "src/foo/bar.js", the module id is "foo/bar.js"
  //   for local src file "src/foo/bar.css" (or any other non-js file), the module id is "foo/bar.css"
  //   for npm package file "node_modules/foo/bar.js", the module id is "foo/bar.js"
  //   for npm package file "node_modules/@scoped/foo/bar.js", the module id is "@scoped/foo/bar.js"
  //
  // packageName:
  //   for any local src file, the package name is undefined
  //   for npm package file "node_modules/foo/bar.js", the package name is "foo"
  //   for npm package file "node_modules/@scoped/foo/bar.js", the package name is "@scoped/foo"

  // Here we skip code splitting in test mode.
  codeSplit: isTest ? undefined : function(moduleId, packageName) {
    // Here for any local src, put into app-bundle
    if (!packageName) return 'app-bundle';
    // The codeSplit func does not need to return a valid bundle name.
    // For any undefined return, dumber put the module into entry bundle,
    // this means no module can skip bundling.
  },

  // onManifest is an optional callback, it provides a file name map like:
  // {
  //   "some-bundle.js": "some-bundle.1234.js",
  //   "other-bundle.js": "other-bundle.3455.js"
  // }
  // Or when hash is off
  // {
  //   "some-bundle.js": "some-bundle.js",
  //   "other-bundle.js": "other-bundle.js"
  // }
  // If you turned on hash, you need this callback to update index.html
  onManifest: isTest ? undefined : function(filenameMap) {
    // Update index.html entry-bundle.js with entry-bundle.hash...js
    console.log('Update index.html with ' + filenameMap['entry-bundle.js']);
    const indexHtml = fs.readFileSync('_index.html').toString()
      .replace('entry-bundle.js', filenameMap['entry-bundle.js']);

    fs.writeFileSync('index.html', indexHtml);
  }
});

function buildJs(src) {
  // @if babel
  const transpile = babel();
  // @endif
  // @if typescript
  const ts = typescript.createProject('tsconfig.json', {noEmitOnError: true});
  const transpile = ts();
  // @endif

  return gulp.src(src, {sourcemaps:/* @if !plugin */ !isProduction/* @endif *//* @if plugin */ true/* @endif */, since: gulp.lastRun(build)})
    .pipe(gulpif(!isProduction && !isTest, plumber()))
    .pipe(transpile);
}

function buildCss(src) {
  // @if sass
  // scss is not one-to-one transform, cannot use {since: lastRun} to check changed file
  // scss is many-to-one transform (muliple _partial.scss files)
  return gulp.src(src, {sourcemaps:/* @if !plugin */ !isProduction/* @endif *//* @if plugin */ true/* @endif */})
    .pipe(gulpif(
      f => f.extname === '.scss',
      // sassPackageImporter handles @import "~bootstrap"
      // https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-package-importer
      isProduction || isTest ?
        sass.sync({quietDeps: true, importer: sassPackageImporter()}) :
        sass.sync({quietDeps: true, importer: sassPackageImporter()}).on('error', sass.logError)
    ))
  // @endif
  // @if less
  // less is not one-to-one transform, cannot use {since: lastRun} to check changed file
  // less is many-to-one transform (muliple _partial.less files)
  return gulp.src(src, {sourcemaps:/* @if !plugin */ !isProduction/* @endif *//* @if plugin */ true/* @endif */})
    .pipe(gulpif(!isProduction && !isTest, plumber()))
    .pipe(gulpif(f => f.extname === '.less', less()))
  // @endif
  // @if css
  return gulp.src(src, {sourcemaps:/* @if !plugin */ !isProduction/* @endif *//* @if plugin */ true/* @endif */})
  // @endif
    .pipe(postcss([
      autoprefixer(),
      // use postcss-url to inline any image/font/svg.
      // postcss-url by default use base64 for images, but
      // encodeURIComponent for svg which does NOT work on
      // some browsers.
      // Here we enforce base64 encoding for all assets to
      // improve compatibility on svg.
      postcssUrl({url: 'inline', encodeType: 'base64'})
    ]));
}

function build() {
  // Merge all js/css/html file streams to feed dumber.
  // Note scss was transpiled to css file by gulp-dart-sass.
  // dumber knows nothing about .ts/.less/.scss/.md files,
  // gulp-* plugins transpiled them into js/css/html before
  // sending to dumber.
  return merge2(
  // @if !plugin
    gulp.src('src/**/*.json', {since: gulp.lastRun(build)}),
    // @if aurelia
    gulp.src('src/**/*.html', {since: gulp.lastRun(build)}),
    // @endif
    // @if babel
    // @if !react
    buildJs(/* @if jasmine || tape || mocha */isTest ? ['src/**/*.js', 'test/**/*.js'] : /* @endif */'src/**/*.js'),
    // @endif
    // @if react
    buildJs(/* @if jasmine || tape || mocha */isTest ? ['src/**/*.js{,x}', 'test/**/*.js{,x}'] : /* @endif */'src/**/*.js{,x}'),
    // @endif
    // @endif
    // @if typescript
    // @if !react
    buildJs(/* @if jasmine || tape || mocha */isTest ? ['src/**/*.ts', 'test/**/*.ts'] : /* @endif */'src/**/*.ts'),
    // @endif
    // @if react
    buildJs(/* @if jasmine || tape || mocha */isTest ? ['src/**/*.ts{,x}', 'test/**/*.ts{,x}'] : /* @endif */'src/**/*.ts{,x}'),
    // @endif
    // @endif
    // @if css
    buildCss('src/**/*.css')
    // @endif
    // @if less
    buildCss('src/**/*.{less,css}')
    // @endif
    // @if sass
    buildCss('src/**/*.{scss,css}')
    // @endif
  // @endif
  // @if plugin
    gulp.src(/* @if jasmine || tape || mocha */isTest ? ['{src,dev-app}/**/*.json', 'test/**/*.json'] : /* @endif */'{src,dev-app}/**/*.json', {since: gulp.lastRun(build)}),
    // @if aurelia
    gulp.src(/* @if jasmine || tape || mocha */isTest ? '{src,dev-app}/**/*.html' : /* @endif */'{src,dev-app}/**/*.html', {since: gulp.lastRun(build)}),
    // @endif
    // @if babel
    // @if !react
    buildJs(/* @if jasmine || tape || mocha */isTest ? ['{src,dev-app}/**/*.js', 'test/**/*.js'] : /* @endif */'{src,dev-app}/**/*.js'),
    // @endif
    // @if react
    buildJs(/* @if jasmine || tape || mocha */isTest ? ['{src,dev-app}/**/*.js{,x}', 'test/**/*.js{,x}'] : /* @endif */'{src,dev-app}/**/*.js{,x}'),
    // @endif
    // @endif
    // @if typescript
    // @if !react
    buildJs(/* @if jasmine || tape || mocha */isTest ? ['{src,dev-app}/**/*.ts', 'test/**/*.ts'] : /* @endif */'{src,dev-app}/**/*.ts'),
    // @endif
    // @if react
    buildJs(/* @if jasmine || tape || mocha */isTest ? ['{src,dev-app}/**/*.ts{,x}', 'test/**/*.ts{,x}'] : /* @endif */'{src,dev-app}/**/*.ts{,x}'),
    // @endif
    // @endif
    // @if css
    buildCss(/* @if jasmine || tape || mocha */isTest ? '{src,dev-app}/**/*.css' : /* @endif */'{src,dev-app}/**/*.css')
    // @endif
    // @if less
    buildCss(/* @if jasmine || tape || mocha */isTest ? '{src,dev-app}/**/*.{less,css}' : /* @endif */'{src,dev-app}/**/*.{less,css}')
    // @endif
    // @if sass
    buildCss(/* @if jasmine || tape || mocha */isTest ? '{src,dev-app}/**/*.{scss,css}' : /* @endif */'{src,dev-app}/**/*.{scss,css}')
    // @endif
  // @endif
  )

  // Note we did extra call `dr()` here, this is designed to cater watch mode.
  // dumber here consumes (swallows) all incoming Vinyl files,
  // then generates new Vinyl files for all output bundle files.
  .pipe(dr())

  // Terser fast minify mode
  // https://github.com/terser-js/terser#terser-fast-minify-mode
  // It's a good balance on size and speed to turn off compress.
  .pipe(gulpif(isProduction, terser({compress: false})))
  // @if !jasmine && !mocha && !tape
  .pipe(gulp.dest(outputDir, {sourcemaps: isProduction ? false : '.'}));
  // @endif
  // @if jasmine || mocha || tape
  .pipe(gulp.dest(outputDir, {sourcemaps: isProduction ? false : (isTest ? true : '.')}));
  // @endif
}

// @if plugin
function buildPlugin() {
  return merge2(
    gulp.src('src/**/*.{json,html}', {since: gulp.lastRun(buildPlugin)}),
    // @if babel
    buildJs('src/**/*.js'),
    // @endif
    // @if typescript
    buildJs('src/**/*.ts'),
    // @endif
    // @if css
    buildCss('src/**/*.css')
    // @endif
    // @if less
    buildCss('src/**/*.{less,css}')
    // @endif
    // @if sass
    buildCss('src/**/*.{scss,css}')
    // @endif
  )

  // Use gulp-sourcemaps instead of default gulp v4
  // to bypass a gulp issue.
  // https://github.com/gulpjs/gulp/issues/2288#issuecomment-506953894
  .pipe(gulpSourcemaps.write('.', {
    includeContent: true,
    sourceRoot: '../src/'
  }))
  .pipe(gulp.dest(pluginOutputDir));
}

// @endif
function clean() {
  return del([outputDir/* @if plugin */, pluginOutputDir/* @endif */]);
}

function clearCache() {
  return dr.clearCache();
}

const serve = gulp.series(
  build,
  function startServer(done) {
    // Open a browser window when not in CI environment.
    devServer.run({
      port: 9000,
      open: !process.env.CI
    });
    done();
  }
)

// Reload dev server
function reload(done) {
  console.log('Reloading the browser');
  devServer.reload();
  done();
}

// Watch all files for rebuild and reload dev server.
function watch() {
  // @if plugin
  gulp.watch('{src,dev-app}/**/*', gulp.series(build, reload));
  // @endif
  // @if !plugin
  gulp.watch('src/**/*', gulp.series(build, reload));
  // @endif
}

const run = gulp.series(clean, serve, watch);

exports.run = run;
exports.default = run;
exports.build = build;
// @if plugin
exports['build-plugin'] = buildPlugin;
// @endif
exports.clean = clean;
exports['clear-cache'] = clearCache;
