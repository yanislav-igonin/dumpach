const generate = () => {
  const data = [];

  for (let i = 0; i < 50; i += 1) {
    data.push({
      board_id: 1,
    });
  }

  for (let i = 0; i < 50; i += 1) {
    data.push({
      board_id: 2,
    });
  }

  return data;
};

const threads = generate();

module.exports = threads;
