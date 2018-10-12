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
    filename: '[name].[hash].js'
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

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(woff(2)?|png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000 }
        }]
      },
      {
        test: /\.(jpe?g|png|gif|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'sass-loader']
      }
    ]
  }
}
