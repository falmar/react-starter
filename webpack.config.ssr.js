const path = require('path')
const webpack = require('webpack')

var nodeExternals = require('webpack-node-externals')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const envs = {
  NODE_ENV: process.env.NODE_ENV,
  APP_SSR: process.env.APP_SSR
}

const plugins = [
  new webpack.DefinePlugin({
    'process.env': Object.keys(envs).reduce(function (acc, key) {
      acc[key] = JSON.stringify(envs[key])

      return acc
    }, {}),
    window: JSON.stringify(null)
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css'
  }),
  new IgnoreEmitPlugin(/\.css/)
]

const optimization = {
  minimizer: [
    new UglifyJsPlugin({
      sourceMap: true
    })
  ],
  splitChunks: {
    chunks: 'all'
  }
}

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'node',

  node: {
    __dirname: false
  },

  entry: {
    bundle: './src/server.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist', 'assets'),
    publicPath: '/assets/',
    filename: '../server.js'
  },

  externals: [nodeExternals()],

  plugins: plugins,
  optimization: process.env.NODE_ENV === 'production' ? optimization : undefined,

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
        test: /\.(woff(2)?|jpe?g|png|gif|)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000 }
        }]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      },
      {
        test: /\.css$/,
        use: ['css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, 'postcss-loader', 'sass-loader']
      }
    ]
  }
}
