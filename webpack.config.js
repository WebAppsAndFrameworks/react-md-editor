module.exports = {
  'entry': 'main.js',
  'output': {
    'path': './',
    'filename': 'index.js'
  },
  'devServer': {
    'inline': true,
    'port': 3333
  },
  'module': {
    'loaders': [
      {
        'exclude': /node_modules/,
        'loaders': ['babel-loader'],
        'query': { 'presets': ['es2015', 'react'] },
        'test': /\.js$/
      }
    ]
  }
};
