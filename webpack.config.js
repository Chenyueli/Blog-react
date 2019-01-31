const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Webpack uses `publicPath` to determine where the app is being served from. In
// development, we always serve from the root. This makes config easier.
const publicPath = '/';

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
  },
  alias: {
    'model': '/client/src/common/model',
    'src': '/client/src',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
    hot: true,
  },
}
