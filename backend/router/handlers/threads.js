const { threads: threadsRepo } = require('../../db/repositories');
const { HttpNotFoundException } = require('../../modules/errors');

module.exports = {
  async list(ctx) {
    const { boardId } = ctx.params;
    const { query } = ctx;

    try {
      const threads = await threadsRepo.list(boardId, query);

      if (!threads) {
        throw new HttpNotFoundException('Threads not found!');
      }

      ctx.body = { data: threads };
    } catch (err) {
      throw new Error(err);
    }
  },

  async read(ctx) {
    const { threadId } = ctx.params;

    try {
      const thread = await threadsRepo.read(threadId);

      if (!thread) {
        throw new HttpNotFoundException();
      }

      ctx.body = { data: thread };
    } catch (err) {
      throw new Error(err);
    }
  },

  async create(ctx) {
    const { boardId } = ctx.params;
    const { body: post } = ctx.request;

    try {
      const thread = await threadsRepo.create(boardId, post);
      
      if (!thread) {
        throw new HttpNotFoundException();
      }

      ctx.body = { data: thread };
    } catch (err) {
      throw new Error(err);
    }
  },

  async update(ctx) {
    const { threadId } = ctx.params;
    const { body: post } = ctx.request;

    try {
      const posts = await threadsRepo.update(threadId, post);
      
      if (!posts) {
        throw new HttpNotFoundException();
      }

      ctx.body = { data: posts };
    } catch (err) {
      throw new Error(err);
    }
  },
};
