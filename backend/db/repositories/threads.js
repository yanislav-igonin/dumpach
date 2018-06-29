const Thread = require('../models/Thread');

module.exports = {
  async list(boardId, query) {
    const threads = await Thread.findAll({
      limit: query.limit,
      offset: query.offset,
      where: {
        board_id: boardId,
      },
    });

    return threads;
  },

  async read(threadId) {
    const thread = await Thread.findById(threadId);

    return thread;
  },
};
