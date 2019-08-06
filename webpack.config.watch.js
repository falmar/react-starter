const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const envs = {
  NODE_ENV: process.env.NODE_ENV,
  APP_SSR: process.env.APP_SSR
}

const plugins = [
  new webpack.DefinePlugin({
    'process.env': Object.keys(envs).reduce(function (acc, key) {
      acc[key] = JSON.stringify(envs[key])

      return acc
    }, {})
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css'
  }),
  new HtmlWebpackPlugin({
    template: './index.html',
    filename: '../index.html'
  })
]

module.exports = {
  mode: 'development',
  target: 'web',

  entry: {
    bundle: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist', 'assets'),
    publicPath: '/assets/',
    filename: '[name].js'
  },

  externals: {},

  plugins: plugins,

  devtool: 'inline-source-map',

  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@redux': path.resolve(__dirname, './src/redux/modules/')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?|jpe?g|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {}
        }, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {}
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, 'postcss-loader', 'sass-loader']
      }
    ]
  }
}
