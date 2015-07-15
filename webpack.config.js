var path = require('path');

module.exports = {
  entry: './test/index.jsx',
  output: {
    path: './test/build',
    filename: 'test.js'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader'}
    ]
  },
  resolve: {
    root: path.resolve('./'),
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map',
  watch: true
};
