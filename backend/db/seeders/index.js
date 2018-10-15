const { logger } = require('../../modules');
const { Board } = require('../models');
const { Post } = require('../models');
const { Section } = require('../models');
const { Thread } = require('../models');
const boards = require('./boards');
const posts = require('./posts');
const sections = require('./sections');
const threads = require('./threads');
const { app } = require('../../config');

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

const seedThreads = async () => {
  boards.forEach(async (board) => {
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
  });
};

const seedPosts = async () => {
  boards.forEach(async (board) => {
    const model = Post[board.id];

    /* eslint no-restricted-syntax: off */
    /* eslint no-await-in-loop: off */
    for (let thread = 1; thread <= app.seeding.threadsPerBoard; thread += 1) {
      try {
        const dbPosts = await model.findAll({ where: { thread_id: thread } });
        if (dbPosts.length === 0) {
          const seed = posts(thread);
          await model.bulkCreate(seed);
        }
      } catch (err) {
        logger.error('seeding threads error');
        logger.error(err);
        process.exit();
      }
    }
  });
};

const init = async () => {
  const { NODE_ENV } = process.env;
  await seedSections();
  await seedBoards();

  if (NODE_ENV === 'development') {
    await seedThreads();
    await seedPosts();
  }
};

module.exports = { init };
