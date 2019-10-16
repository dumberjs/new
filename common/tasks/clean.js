const del = require('del');
const {outputDir/* @if plugin */, pluginOutputDir/* @endif */} = require('./_env');

module.exports = function() {
  return del([outputDir/* @if plugin */, pluginOutputDir/* @endif */]);
}
