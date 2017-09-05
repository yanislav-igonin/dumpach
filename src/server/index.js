const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('../../config/config');
const router = require('./router');
const db = require('./db/connection');

const app = express();

if (!fs.existsSync(config.app.uploadDir)) {
    fs.mkdirSync(config.app.uploadDir);
    console.log('Uploads dir created');
}

if (!fs.existsSync(config.app.uploadDirThumbs)) {
    fs.mkdirSync(config.app.uploadDirThumbs);
    console.log('Uploads thumbs dir created');
}

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/', router)
  .use(morgan('dev'));

db
  .connect()
  .then((cn) => {
    console.log('Database connected on port', config.db.port);
    cn.done(); // success, release connection;
    
    app.listen(config.app.port, () => {
      console.log('Server listening port %d', config.app.port);
    });
  })
  .catch((error) => {
    console.log('ERROR:', error.message);
  });
