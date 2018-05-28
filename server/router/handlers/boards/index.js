module.exports = {
  // getBoards: async () => {
  //   return ['b', 'dev'];
  // }
  async getBoards() {
    return ['b', 'dev'];
  },

  async getThreads(threadId) {
    return ['some boards']
  }
};
