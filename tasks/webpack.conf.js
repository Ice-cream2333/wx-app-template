const { resolve } = require('path')
const r = url => resolve(__dirname, url)
const webpack = require('webpack')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({
  filename: '[name].wxss'
})

module.exports = {
  mode: 'development',
  devtool: false,
  output: {
    path: r('./mina'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      utils: r('../utils/util.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          //loader的参数
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false
              }
            ]
          ]
        }
      },
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [
                  require('autoprefixer')({
                    overrideBrowserslist: ['last 2 versions']
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  indentedSyntax: true
                }
              }
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.mina$/,
        loader: 'wechat-mina-loader',
        options: {
          path: r('../'),
          dist: './mina'
        }
      }
    ]
  },
  plugins: [
    extractSass,
    new CopyWebpackPlugin([
      {
        from: {
          glob: 'pages/**/*.json'
        },
        to: ''
      },
      {
        from: 'static',
        to: 'static'
      }
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ProgressBarPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          sourceMap: false
        }
      })
    ]
  }
}
