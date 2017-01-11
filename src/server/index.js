import http from 'http';
// import https from 'https';
import express from 'express';
import path from 'path';
import formidable from 'formidable';
import fs from 'fs';
import Promise from 'bluebird';

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
const threads = [
    {
        posts: [
            {
                title: 'op post title',
                text: 'op post',
                files: [
                    {
                        name: 'http://i3.kym-cdn.com/photos/images/facebook/000/862/065/0e9.jpg'
                    }
                ]
            },
            {
                title: 'second post title',
                text: 'second post',
                files: [
                    {
                        name: 'http://i3.kym-cdn.com/photos/images/facebook/000/862/065/0e9.jpg'
                    }
                ]
            },
            {
                title: 'third post title',
                text: 'third post',
                files: [
                    {
                        name: 'http://i3.kym-cdn.com/photos/images/facebook/000/862/065/0e9.jpg'
                    }
                ]
            },
            {
                title: 'fourth post title',
                text: 'fourth post',
                files: [
                    {
                        name: 'http://i3.kym-cdn.com/photos/images/facebook/000/862/065/0e9.jpg'
                    }
                ]
            },
        ]
    },
    {
        posts: [
            {
                title: 'second op post title',
                text: 'second thread op post',
                files: [
                    {
                        name: 'http://i3.kym-cdn.com/photos/images/facebook/000/862/065/0e9.jpg'
                    }
                ]
            }
        ]
    },
    {
        posts: [
            {
                title: 'second op post title',
                text: 'second thread op post',
                files: [
                    {
                        name: 'http://i3.kym-cdn.com/photos/images/facebook/000/862/065/0e9.jpg'
                    }
                ]
            }
        ]
    },
    {
        posts: [
            {
                title: 'second op post title',
                text: 'second thread op post',
                files: [
                    {
                        name: 'http://i3.kym-cdn.com/photos/images/facebook/000/862/065/0e9.jpg'
                    }
                ]
            }
        ]
    },
    {
        posts: [
            {
                title: 'second op post title',
                text: 'second thread op post',
                files: [
                    {
                        name: 'http://i3.kym-cdn.com/photos/images/facebook/000/862/065/0e9.jpg'
                    }
                ]
            }
        ]
    },
    {
        posts: [
            {
                title: 'second op post title',
                text: 'second thread op post',
                files: [
                    {
                        name: 'http://i3.kym-cdn.com/photos/images/facebook/000/862/065/0e9.jpg'
                    }
                ]
            }
        ]
    },
];

server.get('/', (req, res) => {
    console.log('GET /', (new Date).toUTCString());
    res.sendFile(path.join(__dirname, '../../view/index.html'));
});

server.get('/threads', (req, res) => {
    console.log('GET /threads', (new Date).toUTCString());
    res.send(threads);
});

/////////////////////////////////////
//SERVER INITIALIZATION
/////////////////////////////////////
server.listen(httpPort, () => {
    console.log('Server is listenning on port', httpPort);
});