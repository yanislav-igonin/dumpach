import http from 'http';
// import https from 'https';
import express from 'express';
import path from 'path';
import formidable from 'formidable';
import fs from 'fs';
import Promise from 'bluebird';

import ThreadsCollection from './api/ThreadsCollection';

const server = express();
let httpPort, httpsPort, privateKey, certificate, uploadDir, credentials, viewPath;


/////////////////////////////////////
//SERVER PROD AND DEV CONFIGURATION
/////////////////////////////////////
server
    .use('/public', express.static(path.join(__dirname, '../../public')))
    .use('/scripts', express.static(path.join(__dirname, '../../dist/client')))
    .use('/uploads', express.static(path.join(__dirname, '../../uploads')));

if(process.env.NODE_ENV === 'production'){

} else {
    httpPort = 8080;

    const webpack = require('webpack');
    const config = require('../../webpack.config');
    const compiler = webpack(config);

    server
        .use(require('webpack-dev-middleware')(compiler, {
            publicPath: config.output.publicPath
        }))
        .use(require('webpack-hot-middleware')(compiler));
}


/////////////////////////////////////
//ROUTES
/////////////////////////////////////

server.get('/', (req, res) => {
    console.log('GET /', (new Date).toUTCString());
    res.sendFile(path.join(__dirname, '../../view/index.html'));
});

server.get('/threads', (req, res) => {
    console.log('GET /threads', (new Date).toUTCString());

    ThreadsCollection.getAllThreads().then((threads) => {
        res.send(threads);
    });

});

/////////////////////////////////////
//SERVER INITIALIZATION
/////////////////////////////////////
server.listen(httpPort, () => {
    console.log('Server is listenning on port', httpPort);
});