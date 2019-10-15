const {NODE_ENV} = process.env;

module.exports = {
  isProduction: NODE_ENV === 'production',
  isTest: NODE_ENV === 'test',
  // @if !plugin
  outputDir: 'dist'
  // @endif
  // @if plugin
  outputDir: 'scripts',
  pluginOutputDir: 'dist'
  // @endif
}
