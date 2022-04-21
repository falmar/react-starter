const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const envs = {
  NODE_ENV: 'production'
}

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin({
    'process.env': Object.keys(envs).reduce(function (acc, key) {
      acc[key] = JSON.stringify(envs[key])

      return acc
    }, {})
  }),

  new HtmlWebpackPlugin({
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      /* @formatter:off  */
      quoteCharacter: "'"
      /* @formatter:on  */
    },

    template: './index.html',
    filename: '../index.html'
  })
]

const optimization = {
  minimizer: [
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        sourceMap: true,
        ecma: 6
      }
    })
  ],
  splitChunks: {
    chunks: 'all'
  }
}

module.exports = {
  mode: 'production',
  target: 'web',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist', 'assets'),
    filename: '[name].[chunkhash].js',
    publicPath: '/assets/'
  },

  plugins: plugins,
  optimization: optimization,

  devtool: 'source-map',

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
        use: [{ loader: 'style-loader' }, {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: false
          }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: false }
        }]
      },
      {
        test: /\.scss$/,
        use: [{ loader: 'style-loader' }, {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: false
          }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: false }
        }, 'resolve-url-loader', {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      }
    ]
  }
}
