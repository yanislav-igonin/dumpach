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
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }   
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
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src/client')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ]
    }
}