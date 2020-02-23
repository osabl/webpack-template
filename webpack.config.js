const Path = require('path');

module.exports = {
    entry: {
        index: './src/index.js'
    },

    output: {
        filename: '[name].js',
        path: Path.resolve(__dirname, 'dist'),
        publicPath: './dist'
    }
}