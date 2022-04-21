const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const envs = {
  NODE_ENV: 'development'
}

const plugins = [
  new webpack.DefinePlugin({
    'process.env': Object.keys(envs).reduce(function (acc, key) {
      acc[key] = JSON.stringify(envs[key])

      return acc
    }, {})
  }),
  new HtmlWebpackPlugin({
    APP_ENV: envs.APP_ENV,
    INTERCOM_APP_ID: envs.INTERCOM_APP_ID,

    template: './index.html',
    filename: '../index.html'
  })
]

const optimization = {
  splitChunks: {
    chunks: 'all'
  }
}
const withSourceMap = process.env.APP_ENV !== 'production'

module.exports = {
  mode: 'development',
  target: 'web',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist', 'assets'),
    filename: '[name].js',
    publicPath: '/assets/'
  },

  plugins: plugins,
  optimization: optimization,

  devtool: 'inline-source-map',

  externals: {},

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
        test: /\.(ttf|eot|svg|woff(2)?|otf|jpe?g|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: withSourceMap
            }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: withSourceMap }
          }]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: withSourceMap
            }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: withSourceMap }
          }, 'resolve-url-loader', {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }]
      },
      {
        type: 'javascript/auto',
        test: /favicon\/manifest\.json$/,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'favicons/[name].[ext]'
          }
        }]
      }
    ]
  }
}
