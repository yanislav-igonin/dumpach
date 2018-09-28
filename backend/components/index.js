const { route: boardsApiRoutes } = require('./boards');
const { route: threadsApiRoutes } = require('./threads');

module.exports = {
  routes: [boardsApiRoutes, threadsApiRoutes],
};
