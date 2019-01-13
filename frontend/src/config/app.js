const env = process.env.NODE_ENV;

const development = {
  api: {
    endpoint: '/api/v1',
  },
};

const production = {
  api: {
    endpoint: '/api/v1',
  },
};

const config = {
  development,
  production,
};

export default config[env];
