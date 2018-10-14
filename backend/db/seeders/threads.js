const generate = () => {
  const data = [];

  for (let i = 0; i < 50; i += 1) {
    data.push({
      board_id: 'b',
    });
  }

  for (let i = 0; i < 50; i += 1) {
    data.push({
      board_id: 'dev',
    });
  }

  return data;
};

const threads = generate();

module.exports = threads;
