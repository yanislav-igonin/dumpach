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

server.post('/threads', (req, res) => {
    console.log('POST /threads', (new Date).toString());

    let _thread = {
        posts: []
    }

    res.setHeader('Access-Control-Allow-Origin', '*');

    var form = new formidable.IncomingForm();

    form.multiples = true;

    // form.uploadDir = path.join(__dirname, 'uploads');

    // form.on('file', (field, file) => {
    //     fs.rename(file.path, path.join(uploadDir, file.name));
    //     console.log('File', file.name, 'uploded');
    //     _post.filesNames.push(file.name);
    // });

    // form.on('field', (name, value) => {
    //     switch (name) {
    //         case 'text':
    //             _post.text = value;
    //             break;
    //     }
    // });

    form.on('progress', (bytesReceived, bytesExpected) => {
        // console.log('Files uploading: ' + (bytesReceived / (1024 * 1024)).toFixed(2) + 'MB/' +  (bytesExpected / (1024 * 1024)).toFixed(2) + 'MB');
    });
    
    form.on('error', (err) => {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', () => {
        // console.log(_post);
        // PostsCollection.saveNewPost(_post).then((status) => {
        //     console.log(status);
        //     PostsCollection.getAllPosts().then((posts) => {
        //         res.status(201).send(posts);
        //     })
        // })
        res.send('201')
    });
    
    form.parse(req, (err, fields, files) => {
        console.log(fields, files);
    });
});

server.get('/threads/:threadId', (req, res) => {
    console.log('GET /thread', (new Date).toUTCString());

    ThreadsCollection.getThreadById(req.params.threadId).then((thread) => {
        if(thread !== null){
            res.send(thread);
        } else {
            res.send('Тред не найден!');
        }
    });
});

/////////////////////////////////////
//SERVER INITIALIZATION
/////////////////////////////////////
server.listen(httpPort, () => {
    console.log('Server is listenning on port', httpPort);
});