const path = require('path')
const fs = require('fs')
const ifaces = require('os').networkInterfaces()
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isDevMode = process.env.NODE_ENV !== 'production'
const isProdMode = !isDevMode

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  distDev: path.resolve(__dirname, 'dev'),
  assets: 'assets/',
  pages: path.resolve(__dirname, 'src/pug/pages')
}

// Pages const for HtmlWebpackPlugin
const PAGES = fs.readdirSync(PATHS.pages).filter(fileName => fileName.endsWith('.pug'))

const plugins = () => {
  const arr = [
    new CleanWebpackPlugin(),
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PATHS.pages}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`,
      minify: {
        html5: isProdMode,
        collapseWhitespace: isProdMode,
        minifyCSS: isProdMode,
        minifyJS: isProdMode,
        minifyURLs: false,
        removeAttributeQuotes: isProdMode,
        removeComments: isProdMode,
        removeEmptyAttributes: isProdMode,
        removeOptionalTags: isProdMode,
        removeRedundantAttributes: isProdMode,
        removeScriptTypeAttributes: isProdMode,
        removeStyleLinkTypeAttributese: isProdMode,
        useShortDoctype: isProdMode
      }
    })),
    new MiniCssExtractPlugin({
      filename: isDevMode ? 'css/[name].css' : `${PATHS.assets}css/[name].[hash].css`
    }),
    new CopyWebpackPlugin([
      // { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      // { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
      { from: `${PATHS.src}/static`, to: '' }
    ])
  ]

  if (isDevMode) {
    arr.push(
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
      }),
      new HtmlBeautifyPlugin()
    )
  } else {
    arr.push(
      new BundleAnalyzerPlugin()
    )
  }

  return arr
}

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProdMode) {
    config.splitChunks = {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }

  return config
}

module.exports = {
  context: PATHS.src,
  entry: {
    index: `${PATHS.src}/index.js`
  },
  output: {
    filename: isDevMode ? 'js/[name].js' : `${PATHS.assets}js/[name].[hash].js`,
    path: isDevMode ? PATHS.distDev : PATHS.dist,
    publicPath: '/'
  },
  devtool: isDevMode ? 'eval-cheap-module-source-map' : '',
  devServer: {
    contentBase: PATHS.distDev,
    host: getMyIpV4Address(ifaces),
    port: '8081',
    overlay: {
      warnings: true,
      errors: true
    }
  },
  optimization: optimization(),

  module: {
    rules: [{
      test: /\.pug$/,
      use: [
        'html-loader',
        'pug-html-loader'
      ]
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: isDevMode ? '[path][name].[ext]' : '[path][name].[hash].[ext]'
        }
      }
    }, {
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]'
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
      test: /\.(sa|sc|c)ss$/,
      use: [
        'style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDevMode
          }
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: isDevMode
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: isDevMode,
            config: {
              path: 'postcss.config.js'
            }
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: isDevMode
          }
        }
      ]
    }]
  },

  plugins: plugins()
}

function getMyIpV4Address (ifaces) {
  let myIpV4Address

  Object.keys(ifaces).forEach(dev => {
    ifaces[dev].filter(details => {
      if (details.family === 'IPv4' && details.internal === false) {
        myIpV4Address = details.address
      }
    })
  })

  return myIpV4Address
}
