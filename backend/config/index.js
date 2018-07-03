const path = require('path');

const env = process.env.NODE_ENV;

const development = {
  app: {
    port: parseInt(process.env.PORT) || 3000,
    uploadDir: path.join(__dirname, '../../../public/uploads'),
  },
  db: {
    database: 'dumpach',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
    options: {
      // host: process.env.DB_HOST || 'postgres', //Uncomment for docker
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DEV_DB_PORT) || 5432,
      dialect: 'postgres',
      logging: false,
    },
  },
};

const production = {
  app: {
    port: parseInt(process.env.PORT) || 3000,
    uploadDir: path.join(__dirname, '../../uploads'),
  },
  db: {
    database: 'dumpach',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'prod-local',
    options: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DEV_DB_PORT) || 5432,
      dialect: 'postgres',
      logging: false,
    },
  },
};

const config = {
  development,
  production,
};

module.exports = config[env];
