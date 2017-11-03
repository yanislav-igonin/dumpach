require('dotenv').config()
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const morgan = require('morgan');

const config = require('./config/config');
const router = require('./router');
const db = require('./db/connection');

const app = express();

const boards = ['b', 'dev'];

if (!fs.existsSync(config.app.uploadDir)) {
  fs.mkdirSync(config.app.uploadDir);
  console.log('uploads dir created');
}
boards.forEach((board) => {
  if (!fs.existsSync(`${config.app.uploadDir}/${board}`)) {
    fs.mkdirSync(`${config.app.uploadDir}/${board}`);
    console.log(board, 'uploads dir created');
  }
  if (!fs.existsSync(`${config.app.uploadDir}/${board}/thumbs`)) {
    fs.mkdirSync(`${config.app.uploadDir}/${board}/thumbs`);
    console.log(board, 'uploads thumbs dir created');
  }
});

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())
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
