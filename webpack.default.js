const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  cache: false,
  optimization: { minimize: true },
  output: { publicPath: 'auto', chunkFilename: '[id][contenthash].js' },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.js', '.ts'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
  plugins: [
    new HtmlPlugin({
      template: './static/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: { configFile: path.resolve(__dirname, 'tsconfig.json'), transpileOnly: true },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1, modules: true } }],
      },
      {
        test: /\.(?:svg|png|jpg|jpeg)$/i,
        use: [{ loader: 'file-loader' }],
      },
    ],
  },
};
