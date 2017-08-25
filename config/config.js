const env = process.env.NODE_ENV; // 'dev' or 'test'

const development = {
  app: {
    port: parseInt(process.env.PORT) || 3000,
    uploadDir: `${__dirname}/../public/upload`,
    uploadDirThumbs: `${__dirname}/../public/upload_thumbs`,
  },
  public: {
    port: parseInt(process.env.PUBLIC_PORT) || 8080,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 27017,
    name: process.env.DEV_DB_NAME || 'db',
  },
};

const production = {
  app: {
    port: parseInt(process.env.TEST_APP_PORT) || 3000,
  },
  public: {
    port: parseInt(process.env.PUBLIC_PORT) || 8080,
  },
  db: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT) || 27017,
    name: process.env.TEST_DB_NAME || 'test',
  },
};

const config = {
  development,
  production,
};

module.exports = config[env];
