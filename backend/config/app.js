const path = require('path');

const env = process.env.NODE_ENV;

const development = {
  port: parseInt(process.env.PORT, 10) || 3000,
  // IF DEVELOPING WITHOUT DOCKER
  // uploads: {
  //   source: path.join(__dirname, '../../frontend/public/uploads/source'),
  //   thumb: path.join(__dirname, '../../frontend/public/uploads/thumb'),
  // },
  uploads: {
    source: path.join(__dirname, '../uploads/source'),
    thumb: path.join(__dirname, '../uploads/thumb'),
  },
  seeding: {
    threadsPerBoard: 50,
    postsPerThread: 250,
  },
};

const production = {
  port: parseInt(process.env.PORT, 10) || 3000,
  uploads: {
    source: path.join(__dirname, '../../uploads/source'),
    thumb: path.join(__dirname, '../../uploads/thumb'),
  },
};

const config = {
  development,
  production,
};

module.exports = config[env];
