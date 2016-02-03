module.exports = {
  'entry': './app/main.js',
  'output': {
    'filename': './public/index.js'
  },
  'devServer': {
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
      }
    ]
  }
};
