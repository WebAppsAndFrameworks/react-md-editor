'use strict';

var webpack = require('webpack');

var env = process.env.NODE_ENV;

var config = {
  'devServer': {
    'host': '0.0.0.0',
    'inline': true,
    'port': 3333
  },
  'module': {
    'loaders': [
      {
        'test': /\.jsx?$/,
        'exclude': /node_modules/,
        'loader': 'babel',
        'query': { 'presets': ['react', 'es2015'] }
      },
      {
        'test': /\.css$/,
        'loader': 'style-loader!css-loader'
      }
    ]
  },
  'plugins': []
};

if (env == 'production') {
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
