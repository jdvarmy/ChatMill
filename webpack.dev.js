const path = require('path');
const { merge } = require('webpack-merge');
const defaultConf = require('./webpack.default');

const config = {
  mode: 'development',
  cache: false,
  devtool: 'cheap-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true,
    open: false,
    hot: true,
  },
  optimization: { minimize: false },
};

module.exports = merge(defaultConf, config);
