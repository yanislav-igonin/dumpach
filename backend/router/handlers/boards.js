const repositories = require('../../db/repositories');

module.exports = {
  async list(ctx) {
    try {
      const boards = await repositories.boards.list();
  
      ctx.body = { data: boards };
    } catch (err) {
      throw new Error(err);
    }
  },
};
