const { boards: boardsRepo } = require('../../db/repositories');

module.exports = {
  async list(ctx) {
    try {
      const boards = await boardsRepo.list();

      ctx.body = { data: boards };
    } catch (err) {
      throw new Error(err);
    }
  },
};
