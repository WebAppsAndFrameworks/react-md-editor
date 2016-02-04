'use strict';

var _ = require('lodash'),
    webpack = require('webpack');

module.exports = _.assign(_.cloneDeep(require('./webpack.config.base')), {
  'entry': './app/main.js',
  'output': {
    'filename': './public/dist/index.js'
  },
  'devServer': {
    'host': '0.0.0.0',
    'inline': true,
    'port': 3333
  }
});
