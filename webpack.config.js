const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    'storage-manager': './src/storage-manager.js',
  },
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'StorageManager'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {

            loader: 'file-loader',
            options: {
              context: 'src',
              name: '[path][name].[ext]',
              outputPath: 'es2015'
            }
          },
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
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
