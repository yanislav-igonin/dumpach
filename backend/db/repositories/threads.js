const Thread = require('../models/Thread');

module.exports = {
  async list(boardId) {
    const threads = await Thread.find({
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
