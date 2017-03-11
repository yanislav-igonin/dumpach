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

    resolve: {
        extensions: ['', '.js', '.jsx']
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

    eslint: {
        configFile: './.eslintrc'
    },

    module: {
        // preLoaders: [
        //     { 
        //         test: /\.jsx?$/, 
        //         loader: 'eslint', 
        //         exclude: /node_modules/ 
        //     }
        // ],
        loaders: [
            {
                test: /\.jsx$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src/client')
            },

            {
                test: /\.scss$/,
             
    "babel-eslint": "^7.1.1",   exclude: /(node_modules)\/react-toolbox/,
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