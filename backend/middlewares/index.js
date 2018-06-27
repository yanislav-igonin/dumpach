const bodyParser = require('./bodyParser');
const errorHandler = require('./errorHandler');

const middlewares = [];

middlewares.push(bodyParser);
middlewares.push(errorHandler);

module.exports = middlewares;
