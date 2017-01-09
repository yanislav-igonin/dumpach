'use strict'

const NODE_ENV = 'development';
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './src/client/App',
    ],
    output: {
        path: path.join(__dirname, 'dist/client'),
        filename: "bundle.js",
        publicPath: '/scripts/'
    },
    watch: true,

    devtool: 'cheap-source-map',

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src/client')
            },
            {
                test: /\.(scss|css)$/, 
                loader: 'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]___[hash:base64:5]!sass-loader?sourceMap!'
            }
        ]
    }
}