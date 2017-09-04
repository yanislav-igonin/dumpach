const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('../../config/config');
const router = require('./router');
const db = require('./db/connection');

const app = express();

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use((req, res, next) => {
    console.log('index', new Date(Date.now()).toLocaleTimeString());
    next();
  })
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
