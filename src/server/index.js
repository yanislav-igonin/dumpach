import http from 'http';
// import https from 'https';
import express from 'express';
import cluster from 'cluster';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';

import indexRoutes from './routes/index';
import apiRoutes from './routes/api';

const server = express(),
    httpPort = process.env.NODE_ENV === 'production'
        ? 80
        : 8080,
    uploadDir = path.join(__dirname, '../../uploads');

// const privateKey, certificate, credentials;//FOR HTTPS IN FUTURE

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

cluster.on('exit', function (worker) {
        console.log('Worker %d died :(', worker.id);
        cluster.fork();
    });

if (process.env.NODE_ENV === 'production') {
    if (cluster.isMaster) {

        let _cpuCount = require('os').cpus().length;

        for (let i = 0; i < _cpuCount; i++) {
            cluster.fork();
        }

    } else {
        initializeServer();
    }
} else {
    initializeServer();
}

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

    if (process.env.NODE_ENV === 'production') {} else {
        const webpack = require('webpack');
        const config = require(path.join(__dirname, '../../webpack.config'));
        const compiler = webpack(config);

        server
            .use(require('webpack-dev-middleware')(compiler, {publicPath: config.output.publicPath, noInfo: true}))
            .use(require('webpack-hot-middleware')(compiler));
    }

    server.listen(httpPort, () => {
        if (process.env.NODE_ENV === 'production') {
            console.log('Worker %d listening port %d', cluster.worker.id, httpPort);
        } else {
            console.log('Server listening port %d', httpPort);
        }
    });
}