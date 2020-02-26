const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',

  output: {
    filename: `${baseWebpackConfig.externals.paths.assets}js/[name].[hash].js`,
    path: baseWebpackConfig.externals.paths.dist,
    publicPath: '/'
  }
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
