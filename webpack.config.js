module.exports = {
  'entry': './app/main.js',
  'output': {
    'filename': './public/dist/index.js'
  },
  'devServer': {
    'host': '0.0.0.0',
    'inline': true,
    'port': 3333
  },
  'module': {
    'loaders': [
      {
        'exclude': /node_modules/,
        'loader': 'babel',
        'query': {
          'presets': ['react', 'es2015']
        },
        'test': /\.jsx?$/
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};
