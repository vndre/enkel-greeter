const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            encoding: 'base64'
          }
        }
      },
      {
        test: /\.woff(2)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top',
              singleton: true
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(svelte)$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader'
        }
      }
    ]
  }
};