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
};
