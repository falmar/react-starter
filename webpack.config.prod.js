const {join} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const VENDOR_LIBS = [
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
  'redux-thunk'
]

const babelLoader = {
  test: /\.jsx?$/,
  use: [{
    loader: 'babel-loader',
    options: {
      babelrc: false,
      presets: [
        ['env', {
          'modules': false
        }
        ],
        'react',
        'stage-2'
      ],
      plugins: [
        'transform-react-constant-elements',
        'transform-react-inline-elements'
      ]
    }
  }],
  exclude: /node_modules/
}

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      // this may be not necessary since webpack 2
      // inject it with -p command line option
      // but is open for setting your own envs as well
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest']
  }),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.optimize.UglifyJsPlugin({
    sourcemap: false
  }),
  new HtmlWebpackPlugin({
    template: './index.html'
  })
]

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      babelLoader,
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css/
      }
    ]
  },
  plugins: plugins
}
