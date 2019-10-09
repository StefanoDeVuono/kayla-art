const webpack = require('webpack'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  OpenBrowserPlugin = require('open-browser-webpack-plugin')

const title = 'Prototype for Kayla'

module.exports = {
  entry: {
    app: './src/sketch.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
    new HtmlWebpackPlugin({
      title,
      template: 'src/index.html'
    }),
    new OpenBrowserPlugin()
  ],

  devtool: 'cheap-eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
    watchContentBase: true
  }
}
