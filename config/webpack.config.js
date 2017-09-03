const webpack = require('webpack');
const config = require('./config');

module.exports = {
  entry: [
    `webpack-dev-server/client?http://localhost:${config.public.port}`,
    'webpack/hot/only-dev-server',
    './src/client/index',
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader', 'babel-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/../public/dist`,
    publicPath: '/dist',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './public',
    hot: true,
    proxy: { '/api': `http://localhost:${config.app.port}` },
    historyApiFallback: true,
    host: '0.0.0.0',
  },

  devtool: 'cheap-source-map',

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
