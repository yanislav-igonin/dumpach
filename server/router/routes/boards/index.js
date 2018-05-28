const router = require('koa-router')();
const handlers = require('../../handlers');

router.get('/', async (ctx) => {
  try {
    const boards = await handlers.boards.getBoards();

    ctx.body = { data: boards };
  } catch (e) {
    throw new Error(e);
  }
});

router.get('/:boardId', async (ctx) => {
  try {
    const threads = await handlers.boards.getThreads();

    ctx.body = { data: threads };
  } catch (e) {
    throw new Error(e);
  }
});

// router.post('/:boardId', (ctx) => (ctx.body = `POSTED ${ctx.params.boardId}`));

module.exports = router.routes();
