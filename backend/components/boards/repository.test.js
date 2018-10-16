/* eslint no-undef: off */
const { seeders } = require('../../db');
const Repository = require('./repository');

describe('boards repository', () => {
  beforeAll(async () => {
    await seeders.init();
    repository = new Repository();
  });

  test('should return sections list', async () => {
    const repository = new Repository();

    const desiredBoard = {
      id: 'b',
      title: 'random',
      threads_limit: 50,
      section_id: 1,
    };

    const section = await repository.findBoards();

    expect(section.length).toBe(2);
    expect(section[0].boards[0]).toMatchObject(desiredBoard);
  });

  test('should return one board', async () => {
    const repository = new Repository();

    const desiredBoard = {
      id: 'b',
      title: 'random',
      threads_limit: 50,
      section_id: 1,
    };

    const board = await repository.findBoard('b');

    expect(board).toMatchObject(desiredBoard);
  });

  test('should return null', async () => {
    const repository = new Repository();

    const board = await repository.findBoard('some_random_name');

    expect(board).toBeNull();
  });
});
