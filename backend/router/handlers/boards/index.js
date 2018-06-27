// const repositories = require('../../../db/repositories')

module.exports = {
  async getBoards() {
    return ['b', 'dev'];
  },

  async getThreads(threadId) {
    return ['some boards']
  }
};
