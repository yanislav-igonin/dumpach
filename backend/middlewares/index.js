const bodyParser = require('./bodyParser');
const errorHandler = require('./errorHandler');
const helmet = require('./helmet');

const middlewares = [];

middlewares.push(helmet);
middlewares.push(bodyParser);
middlewares.push(errorHandler);

module.exports = middlewares;
