const path = require('path');

const env = process.env.NODE_ENV;

const development = {
  port: parseInt(process.env.PORT) || 3000,
  uploads: path.join(__dirname, '../../frontend/public/uploads'),
};

const production = {
  port: parseInt(process.env.PORT) || 3000,
  uploads: path.join(__dirname, '../../uploads'),
};

const config = {
  development,
  production,
};

module.exports = config[env];
