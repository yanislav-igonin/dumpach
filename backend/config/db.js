const env = process.env.NODE_ENV;

const development = {
  database: 'dumpach',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  options: {
    host: process.env.DB_HOST || 'postgres', // Uncomment for docker
    // host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT, 10) || 5432,
    dialect: 'postgres',
    logging: true,
  },
};

const production = {
  database: 'dumpach',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  options: {
    host: process.env.DB_HOST || 'postgres',
    port: parseInt(process.env.DEV_DB_PORT, 10) || 5432,
    dialect: 'postgres',
    logging: false,
  },
};

const config = {
  development,
  production,
};

module.exports = config[env];
