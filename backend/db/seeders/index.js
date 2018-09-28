const { Section } = require('../models');
const { Board } = require('../models');
const sections = require('./sections');
const boards = require('./boards');

const seedSections = async () => {
  const dbSections = await Section.findAll();
  if (dbSections.length === 0) {
    try {
      await Section.bulkCreate(sections);
    } catch (err) {
      console.error('seeding section error');
      console.error(err);
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
    }
  }
};

const init = async () => {
  await seedSections();
  await seedBoards();
};

module.exports = init;
