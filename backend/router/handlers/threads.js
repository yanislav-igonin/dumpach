const { threads: threadsRepo } = require('../../db/repositories');
const { HttpNotFoundException } = require('../../modules/errors');

module.exports = {
  async list(ctx) {
    const { boardId } = ctx.params;
    const { query } = ctx;

    const threads = await threadsRepo.list(boardId, query);

    if (!threads) {
      throw new HttpNotFoundException('Threads not found!');
    }

    ctx.body = { data: threads };
  },

  async read(ctx) {
    const { threadId } = ctx.params;

    const thread = await threadsRepo.read(threadId);

    if (!thread) {
      throw new HttpNotFoundException('Thread not found!');
    }

    ctx.body = { data: thread };
  },

  async create(ctx) {
    const { boardId } = ctx.params;
    const { body: post } = ctx.request;

    const thread = await threadsRepo.create(boardId, post);

    if (!thread) {
      throw new HttpNotFoundException();
    }

    ctx.body = { data: thread };
  },

  async update(ctx) {
    const { threadId } = ctx.params;
    const { body: post } = ctx.request;

    const posts = await threadsRepo.update(threadId, post);

    if (!posts) {
      throw new HttpNotFoundException();
    }

    ctx.body = { data: posts };
  },
};
