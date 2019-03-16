const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    'storage': './src/storage.js',
    'storage.min': './src/storage.js',
  },
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'Storage'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  }
}
