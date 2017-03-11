'use strict'

const NODE_ENV = 'production';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        './src/client/App'
    ],
    output: {
        path: path.join(__dirname, 'dist/client'),
        filename: "bundle.js"
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false,
                drop_console: true,
                unsafe:true
            }
        })
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src/client')
            },

            {
                test: /\.scss$/,
                exclude: /(node_modules)\/react-toolbox/,
                loader: ExtractTextPlugin.extract('css!sass'),
            },
            {
                test: /(\.scss|\.css)$/,
                include : /(node_modules)\/react-toolbox/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass')
            }
        ]
    }
}