const { threads: threadsRepo } = require('../../db/repositories');
const { HttpNotFoundException } = require('../../modules/errors');
const parseFormData = require('../../modules/formDataParser');

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
    const { boardId } = ctx.params;

    const { files, fields: post } = await parseFormData(ctx.req);

    const thread = await threadsRepo.create(boardId, post, files);

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
