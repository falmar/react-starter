const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].[chunkhash].css',
    chunkFilename: '[id].[chunkhash].css'
  }),
  new HtmlWebpackPlugin({
    template: './index.html'
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
    chunks: 'all',
    cacheGroups: {
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      }
    }
  }
}

module.exports = {
  mode: 'production',
  target: 'web',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
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
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]_[chunkhash].[ext]'
          }
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {}
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true }
        }]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {}
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true }
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
