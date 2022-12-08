const path = require('path');
const { merge } = require('webpack-merge');
const defaultConf = require('./webpack.default');

module.exports = merge(defaultConf, {
  mode: 'production',
  devtool: false,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
});
