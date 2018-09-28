const { Board } = require('../models');
const { Post } = require('../models');
const { Section } = require('../models');
const { Thread } = require('../models');
const boards = require('./boards');
const posts = require('./posts');
const sections = require('./sections');
const threads = require('./threads');

const seedSections = async () => {
  const dbSections = await Section.findAll();
  if (dbSections.length === 0) {
    try {
      await Section.bulkCreate(sections);
    } catch (err) {
      console.error('seeding sections error');
      console.error(err);
      process.exit();
    }
  }
};

const seedBoards = async () => {
  const dbBoards = await Board.findAll();
  if (dbBoards.length === 0) {
    try {
      await Board.bulkCreate(boards);
    } catch (err) {
      console.error('seeding boards error');
      console.error(err);
      process.exit();
    }
  }
};

const seedThreads = async () => {
  const dbThreads = await Thread.findAll();
  if (dbThreads.length === 0) {
    try {
      await Thread.bulkCreate(threads);
    } catch (err) {
      console.error('seeding threads error');
      console.error(err);
      process.exit();
    }
  }
};

const seedPosts = async () => {
  const dbPosts = await Post.findAll();
  if (dbPosts.length === 0) {
    try {
      await Post.bulkCreate(posts);
    } catch (err) {
      console.error('seeding threads error');
      console.error(err);
      process.exit();
    }
  }
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

module.exports = init;
