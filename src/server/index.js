const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const db_url = 'mongodb://localhost:27017/dumpach';

const app = express(),
    port =  8080,
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

    app
        .use('/assets', express.static(path.join(__dirname, '../../dist/client')))
        .use('/public', express.static(path.join(__dirname, '../../public')))
        .use('/threads/assets', express.static(path.join(__dirname, '../../dist/client')))
        .use('/uploads', express.static(uploadDir))
        .use('/uploads_thumbs', express.static(uploadThumbsDir));

    app
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({extended: true}))
        .use(morgan('dev'));

    if (process.env.NODE_ENV !== 'production') {
        const webpack = require('webpack');
        const config = require(path.join(__dirname, '../../webpack.config.js'));
        const compiler = webpack(config);

        app
            .use(require('webpack-dev-middleware')(compiler, {publicPath: config.output.publicPath, noInfo: true}))
            .use(require('webpack-hot-middleware')(compiler));
    }

    MongoClient.connect(db_url, (err, db) => {
        assert.equal(null, err);
        console.log("Database connected correctly to server");

        require('./routes/index')(app);
        require('./routes/api')(app, db);

        app.listen(port, () => {
            console.log('Server listening port %d', port);
        });
    });
}