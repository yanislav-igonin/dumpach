import http from 'http';
import express from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';

import indexRoutes from './routes/index';
import apiRoutes from './routes/api';

const server = express(),
    httpPort =  8080,
    uploadDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

initializeServer();

// /////////////////////////////////// SERVER INITIALIZATION
// ///////////////////////////////////
function initializeServer() {
    const server = express();

    //STATIC FILES
    server
        .use('/public', express.static(path.join(__dirname, '../../public')))
        .use('/scripts', express.static(path.join(__dirname, '../../dist/client')))
        .use('/threads/scripts', express.static(path.join(__dirname, '../../dist/client')))
        .use('/uploads', express.static(uploadDir));

    //BODY PARSERS
    server
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({extended: true}));

    //ROUTES
    server
        .use('/', indexRoutes)
        .use('/api', apiRoutes);

    if (process.env.NODE_ENV !== 'production') {
        const webpack = require('webpack');
        const config = require(path.join(__dirname, '../../webpack.config'));
        const compiler = webpack(config);

        server
            .use(require('webpack-dev-middleware')(compiler, {publicPath: config.output.publicPath, noInfo: true}))
            .use(require('webpack-hot-middleware')(compiler));
    }

    server.listen(httpPort, () => {
        console.log('Server listening port %d', httpPort);
    });
}