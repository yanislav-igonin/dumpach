const { logger } = require('../../modules');
const { Board } = require('../models');
const { Post } = require('../models');
const { Section } = require('../models');
const { Thread } = require('../models');
const boards = require('./boards');
const posts = require('./posts');
const sections = require('./sections');
const threads = require('./threads');

const seedSections = async () => {
  try {
    const dbSections = await Section.findAll();

    if (dbSections.length === 0) {
      await Section.bulkCreate(sections);
    }
  } catch (err) {
    logger.error('seeding sections error');
    logger.error(err);
    process.exit();
  }
};

const seedBoards = async () => {
  try {
    const dbBoards = await Board.findAll();

    if (dbBoards.length === 0) {
      await Board.bulkCreate(boards);
    }
  } catch (err) {
    logger.error('seeding boards error');
    logger.error(err);
    process.exit();
  }
};

const seedThreads = async () => Promise.all(
  boards.map(async (board) => {
    const model = Thread[board.id];
    const seed = threads[board.id];

    try {
      const dbThreads = await model.findAll();

      if (dbThreads.length === 0) {
        await model.bulkCreate(seed);
      }
    } catch (err) {
      logger.error('seeding threads error');
      logger.error(err);
      process.exit();
    }
  }),
);

const seedPosts = async () => Promise.all(
  boards.map(async (board) => {
    const model = Post[board.id];
    const threadModel = Thread[board.id];

    const dbThreads = await threadModel.findAll();

    return Promise.all(
      dbThreads.map(async (thread) => {
        try {
          const dbPosts = await model.findAll({ where: { thread_id: thread.id } });
          if (dbPosts.length === 0) {
            const seed = posts(thread);
            await model.bulkCreate(seed);
          }
        } catch (err) {
          logger.error('seeding posts error');
          logger.error(err);
          process.exit();
        }
      }),
    );
  }),
);

const init = async () => {
  const { NODE_ENV } = process.env;
  await seedSections();
  await seedBoards();

  if (NODE_ENV === 'development' || NODE_ENV === 'test') {
    await seedThreads();
    await seedPosts();
  }
};

module.exports = { init };
