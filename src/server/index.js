import http from 'http';
import express from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import indexRoutes from './routes/index';
import apiRoutes from './routes/api';

const server = express(),
    httpPort =  8080,
    uploadDir = path.join(__dirname, '../../uploads'),
    uploadThumbsDir = path.join(__dirname, '../../uploads_thumbs');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log('Uploads dir created');
}

if (!fs.existsSync(uploadThumbsDir)) {
    fs.mkdirSync(uploadThumbsDir);
    console.log('Uploads thumbs dir created');
}

initializeServer();

// /////////////////////////////////// SERVER INITIALIZATION
// ///////////////////////////////////
function initializeServer() {
    const server = express();

    //STATIC FILES
    server
        .use('/assets', express.static(path.join(__dirname, '../../dist/client')))
        .use('/public', express.static(path.join(__dirname, '../../public')))
        .use('/threads/assets', express.static(path.join(__dirname, '../../dist/client')))
        .use('/uploads', express.static(uploadDir))
        .use('/uploads_thumbs', express.static(uploadThumbsDir));

    //BODY PARSERS
    server
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({extended: true}))
        .use(morgan('dev'));

    //ROUTES
    server
        .use('/', indexRoutes)
        .use('/api', apiRoutes);

    if (process.env.NODE_ENV !== 'production') {
        const webpack = require('webpack');
        const config = require(path.join(__dirname, '../../webpack.config.js'));
        const compiler = webpack(config);

        server
            .use(require('webpack-dev-middleware')(compiler, {publicPath: config.output.publicPath, noInfo: true}))
            .use(require('webpack-hot-middleware')(compiler));
    }

    server.listen(httpPort, () => {
        console.log('Server listening port %d', httpPort);
    });
}