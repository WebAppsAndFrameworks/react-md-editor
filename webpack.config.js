'use strict';

var _ = require('lodash'),
    webpack = require('webpack'),
    config = _.cloneDeep(require('./webpack.config.base'));

if (process.env.NODE_ENV == 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      'compressor': {
        'pure_getters': true,
        'screw_ie8': true,
        'unsafe': true,
        'unsafe_comps': true,
        'warnings': false
      }
    })
  );
}

module.exports = config;
