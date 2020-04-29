module.exports = {
  plugins: [
    require('autoprefixer'),
    require('css-mqpacker'),
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true
          },
          normalizeWhitespace: process.env.NODE_ENV === 'production'
        }
      ]
    })
  ]
}
