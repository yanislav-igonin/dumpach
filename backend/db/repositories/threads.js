const { Board, Thread, Post, Attachment } = require('../models');

module.exports = {
  async list(boardId, query) {
    try {
      const board = await Board.findOne({
        where: {
          identifier: boardId,
        },
      });

      const threads = await Thread.findAll({
        limit: query.limit,
        offset: query.offset,
        logging: console.log,
        where: {
          board_id: board.id,
        },
        include: [
          {
            limit: 4, // TODO: Make first post and last three
            // order: [['created_at', 'asc']], // TODO: Fix posts ordering
            model: Post,
            include: [
              {
                model: Attachment,
              },
            ],
          },
        ],
        order: [['updated_at', 'desc']], // TODO: Add Posts ordering
      });

      return threads;
    } catch (err) {
      throw new Error(err);
    }
  },

  async read(threadId) {
    try {
      const thread = await Thread.findById(threadId, {
        include: [
          {
            model: Post,
            include: [{ model: Attachment }],
          },
        ],
        order: [
          [Post, 'created_at', 'asc'],
          [Post, Attachment, 'created_at', 'asc'], //TODO: Check attachments ordering
        ],
      });

      return thread;
    } catch (err) {
      throw new Error(err);
    }
  },

  async create(boardId, fields, files) {
    try {
      const board = await Board.findOne({
        where: {
          identifier: boardId,
        },
      });
      const thread = (await Thread.create({ board_id: board.id })).toJSON();
      const post = (await Post.create({
        ...fields,
        thread_id: thread.id,
      })).toJSON();

      const preparedFiles = files.map(file => ({
        name: file,
        thread_id: thread.id,
        post_id: post.id,
      }));
      const attachments = await Promise.all(
        preparedFiles.map(file => Attachment.create(file))
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

      const preparedFiles = files.map(file => ({
        name: file,
        thread_id: threadId,
        post_id: post.id,
      }));

      await Promise.all(preparedFiles.map(file => Attachment.create(file)));

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
