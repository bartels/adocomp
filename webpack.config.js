const path = require('path')
const webpack = require('webpack')

const env = process.env.NODE_ENV

module.exports = {
  context: path.resolve('.'),

  entry: {
    main: [
      './index',
    ],
  },

  output: {
    path: path.resolve('./dist'),
    filename: 'adocomp.js',
  },

  resolve: {
    root: path.resolve('./'),
    extensions: ['', '.js', '.jsx', '.json'],
  },

  module: {

    // Loaders for different file types
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory',
      },
    ],

    // These deps do not use 'require' so can skip parsing and speed things up
    noParse: [
      // path.resolve('./node_modules/jquery'),
    ],
  },

  plugins: env === 'production' ? [
    // ensure production env is set
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    // Keep hashes consistent between compilations
    new webpack.optimize.OccurenceOrderPlugin(),

    // Remove duplicated code
    new webpack.optimize.DedupePlugin(),

    // minify js code
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
    }),

  ] : [],
}
