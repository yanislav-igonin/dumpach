const { Thread, Post } = require('../models');

module.exports = {
  async list(boardId, query) {
    try {
      const threads = await Thread.findAll({
        limit: query.limit,
        offset: query.offset,
        where: {
          board_id: boardId,
        },
      });

      return threads;
    } catch (err) {
      throw new Error(err);
    }
  },

  async read(threadId) {
    try {
      const thread = await Thread.findById(threadId);

      return thread;
    } catch (err) {
      throw new Error(err);
    }
  },

  async create(boardId, postFields) {
    try {
      const thread = (await Thread.create({ board_id: boardId })).toJSON();
      const post = (await Post.create(postFields)).toJSON();
      thread.posts = [post];
      
      return thread;
    } catch (err) {
      throw new Error(err);
    }
  },
};
