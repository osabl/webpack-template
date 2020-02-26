const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// Main const
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin
const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    index: `${PATHS.src}/index.js`
  },

  // optimization: {
  //     splitChunks: {
  //       cacheGroups: {
  //         vendor: {
  //           name: 'vendors',
  //           test: /node_modules/,
  //           chunks: 'all',
  //           enforce: true
  //         }
  //       }
  //     }
  //   },

  module: {
    rules: [{
      test: /\.pug$/,
      use: 'pug-loader'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    }, {
      test: /\.js$/,
      exclude: '/node_modules/',
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: './webpack/postcss.config.js'
            }
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: './webpack/postcss.config.js'
            }
          }
        }
      ]
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`
    }),
    new CopyWebpackPlugin([{
      from: `${PATHS.src}/img`,
      to: `${PATHS.assets}/img`
    }, {
      from: `${PATHS.src}/static`,
      to: ''
    }]),
    new CleanWebpackPlugin()
  ]
}
