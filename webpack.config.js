const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router-dom', 'axios', 'reactstrap'],
        twttr: ['./src/main/Twttr.js']
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        historyApiFallback: true
    }
}