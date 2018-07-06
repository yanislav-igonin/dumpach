const { Thread, Post, Attachment } = require('../models');

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
        include: [
          {
            limit: 4,
            model: Post,
            include: [
              {
                model: Attachment,
              },
            ],
          },
        ],
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
        Post.findAll({
          where: { thread_id: threadId },
          include: [{ model: Attachment }],
        }),
      ]);

      if (!data[0]) {
        return null;
      }

      const thread = data[0].toJSON();
      thread.posts = data[1].map((post) => post.toJSON());

      return thread;
    } catch (err) {
      throw new Error(err);
    }
  },

  async create(boardId, fields, files) {
    try {
      const thread = (await Thread.create({ board_id: boardId })).toJSON();
      const post = (await Post.create({
        ...fields,
        thread_id: thread.id,
      })).toJSON();

      const preparedFiles = files.map((file) => ({
        name: file,
        thread_id: thread.id,
        post_id: post.id,
      }));
      const attachments = await Promise.all(
        preparedFiles.map((file) => Attachment.create(file)),
      );

      post.attachments = attachments;
      thread.posts = [post];

      return thread;
    } catch (err) {
      throw new Error(err);
    }
  },

  async update(threadId, fields, files) {
    try {
      const post = await Post.create({
        ...fields,
        thread_id: threadId,
      });

      const preparedFiles = files.map((file) => ({
        name: file,
        thread_id: threadId,
        post_id: post.id,
      }));

      await Promise.all(preparedFiles.map((file) => Attachment.create(file)));

      const posts = await Post.findAll({
        where: { thread_id: threadId },
        include: [
          {
            model: Attachment,
          },
        ],
      });

      return posts;
    } catch (err) {
      throw new Error(err);
    }
  },
};
