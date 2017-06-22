'use strict'

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
        extensions: ['.js', '.jsx']
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin({
            filename: 'style.css',
            disable: false,
            allChunks: true
        }),
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/, 
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src/client')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!sass-loader",
                }),
            }
        ]
    }
}