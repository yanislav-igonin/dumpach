const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('../../config/config');
const router = require('./router');

const app = express();

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use((req, res, next) => {
    console.log('index', (new Date(Date.now()).toLocaleTimeString()));
    next();
  })
  .use('/', router)
  .use(morgan('dev'));

app.listen(config.app.port, () => {
  console.log('Server listening port %d', config.app.port);
});
