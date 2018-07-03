const { Thread, Post } = require('../models');

module.exports = {
  async list(boardId, query) {
    try {
      const threads = await Thread.findAll({
        limit: query.limit,
        offset: query.offset,
        order: [['updated_at', 'desc']],
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
      const data = await Promise.all([
        Thread.findById(threadId),
        Post.findAll({ where: { thread_id: threadId } }),
      ]);

      const thread = data[0].toJSON();
      thread.posts = data[1].map((post) => post.toJSON());

      return thread;
    } catch (err) {
      throw new Error(err);
    }
  },

  async create(boardId, postFields) {
    try {
      const thread = (await Thread.create({ board_id: boardId })).toJSON();
      const post = (await Post.create({
        ...postFields,
        thread_id: thread.id,
      })).toJSON();
      thread.posts = [post];

      return thread;
    } catch (err) {
      throw new Error(err);
    }
  },

  async update(threadId, postFields) {
    try {
      await Post.create({
        ...postFields,
        thread_id: threadId,
      });

      const posts = await Post.findAll({ where: { thread_id: threadId } });

      return posts;
    } catch (err) {
      throw new Error(err);
    }
  },
};
