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
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 5432,
    database: 'dumpach',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
  },
};

const production = {
  app: {
    port: parseInt(process.env.PORT) || 3000,
    uploadDir: `${__dirname}/../public/upload`,
    uploadDirThumbs: `${__dirname}/../public/upload_thumbs`,
  },
  public: {
    port: parseInt(process.env.PUBLIC_PORT) || 8080,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    database: 'dumpach',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};

const config = {
  development,
  production,
};

module.exports = config[env];
