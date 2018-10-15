const { app } = require('../../config');
const boards = require('./boards');

const generate = () => {
  const data = {};

  boards.forEach((board) => {
    data[board.id] = [];

    for (let i = 0; i < app.seeding.threadsPerBoard; i += 1) {
      data[board.id].push({
        board_id: board.id,
      });
    }
  });

  return data;
};

const threads = generate();

module.exports = threads;
