const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html'
  })
]

module.exports = {
  mode: 'development',
  target: 'web',

  entry: {
    bundle: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[fullhash].js',
    publicPath: '/'
  },

  plugins: plugins,

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    port: '3000',
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true
  },

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
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
        test: /\.(woff(2)?|jpe?g|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        use: [{
          loader: 'url-loader',
          options: { limit: 3000 }
        }]
      },
      {
        test: /\.(ttf|eot|otf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, 'postcss-loader', 'resolve-url-loader', {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      }
    ]
  }
}
