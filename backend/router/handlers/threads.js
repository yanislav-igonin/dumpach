const repositories = require('../../db/repositories');

module.exports = {
  async list(ctx) {
    const { boardId } = ctx.params;

    try {
      const threads = await repositories.threads.list(boardId);

      ctx.body = { data: threads };
    } catch (err) {
      throw new Error(err);
    }
  },
  async read(ctx) {
    const { threadId } = ctx.params;

    try {
      const thread = await repositories.threads.read(threadId);

      ctx.body = { data: thread };
    } catch (err) {
      throw new Error(err);
    }
  },
};
