'use strict'

const NODE_ENV = 'development';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './src/client/App.jsx',
    ],
    output: {
        path: path.join(__dirname, 'dist/client'),
        filename: "bundle.js",
        publicPath: '/scripts/'
    },
    
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },

    watch: true,

    devtool: 'cheap-source-map',

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/, 
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src/client')
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
}