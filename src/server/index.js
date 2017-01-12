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

uploadDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

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
    },  _post = {
        title: '',
        text: '',
        files: []
    },  _fullFilePath, _fileName;

    res.setHeader('Access-Control-Allow-Origin', '*');

    var form = new formidable.IncomingForm();

    form.multiples = true;

    form.uploadDir = uploadDir;

    form.on('file', (field, file) => {
        _fullFilePath = file.path + '.' + file.type.split('/')[1];
        _fileName = _fullFilePath.split('/')[_fullFilePath.split('/').length - 1];
        fs.rename(file.path, _fullFilePath);
        console.log('File', file.name, 'uploded');
        _post.files.push(_fileName);
    });

    form.on('field', (name, value) => {
        console.log(name, value);
        switch (name) {
            case 'title':
                _post.title = value;
                break;
            case 'text':
                _post.text = value;
                break;
        }
    });
    
    form.on('error', (err) => {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', () => {
        _thread.posts.push(_post);

        ThreadsCollection.createNewThread(_thread).then((thread) => {
            if(thread.posts !== undefined){
                res.status(201).send(thread._id);
            } else {
                res.send('Ошибка при создании треда!');
            }
        })

    });

    form.parse(req, (err, fields, files) => {
        // console.log(fields, files);
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