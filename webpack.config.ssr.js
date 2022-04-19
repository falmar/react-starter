const path = require('path')
const webpack = require('webpack')
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const envs = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_SSR: '1',
  APP_SRV: '1',
  PORT: process.env.PORT
}

const plugins = [
  new webpack.DefinePlugin({
    'process.env': Object.keys(envs).reduce(function (acc, key) {
      acc[key] = JSON.stringify(envs[key])

      return acc
    }, {}),
    window: JSON.stringify(null)
  }),
  new IgnoreEmitPlugin(/\.(css|ttf|eot|svg|woff(2)?|otf|jpe?g|png|gif)/)
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
const withSourceMap = process.env.APP_ENV !== 'production'

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'node',

  node: {
    __dirname: false
  },

  entry: {
    bundle: './src/server/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist', 'assets'),
    filename: '../server.js',
    publicPath: '/assets/'
  },

  externals: [nodeExternals(), {
    grecaptcha: {}
  }],

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
        test: /\.(ttf|eot|svg|woff(2)?|otf|jpe?g|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: [{
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
        use: [{
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
