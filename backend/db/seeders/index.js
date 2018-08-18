const { Section } = require('../models');
const { Board } = require('../models');
const sections = require('./sections');
const boards = require('./boards');

const seedAll = async () => {
  const dbSections = await Section.findAll();
  if (dbSections.length === 0) {
    await Section.bulkCreate(sections);
  }

  const dbBoards = await Board.findAll();
  if (dbBoards.length === 0) {
    await Board.bulkCreate(boards);
  }

  return;
};

module.exports = seedAll;
