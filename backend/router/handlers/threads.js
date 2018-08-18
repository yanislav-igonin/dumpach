const { threads: threadsRepo } = require('../../db/repositories');
const { HttpNotFoundException } = require('../../modules/errors');
const mediaFiles = require('../../modules/mediaFiles');

module.exports = {
  async list(ctx) {
    const { boardId } = ctx.params;
    const { query } = ctx;

    const threads = await threadsRepo.list(boardId, query);

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
    try {
      const { boardId } = ctx.params;
  
      const { files, fields } = await mediaFiles.parseFormData(ctx.req);
  
      const thread = await threadsRepo.create(boardId, fields, files);
  
      ctx.body = { data: thread };
    } catch (err) {
      throw err;
    }
  },

  async update(ctx) {
    const { threadId } = ctx.params;

    const { files, fields } = await mediaFiles.parseFormData(ctx.req);

    const posts = await threadsRepo.update(threadId, fields, files);

    ctx.body = { data: posts };
  },
};
