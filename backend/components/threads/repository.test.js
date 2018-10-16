/* eslint no-undef: off */
const { seeders } = require('../../db');
const Repository = require('./repository');

describe('threads repository', () => {
  beforeAll(async () => {
    await seeders.init();
  });

  describe('findBoard', () => {
    test('should return one board', async () => {
      const repository = new Repository('b');

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
      const repository = new Repository('some_random_name');

      const board = await repository.findBoard();

      expect(board).toBeNull();
    });
  });

  describe('findThreads', () => {
    test('should return threads list with length 10', async () => {
      const repository = new Repository('b');

      const threads = await repository.findThreads();

      expect(threads).toHaveLength(10);
    });

    test('should return threads list with length 20', async () => {
      const repository = new Repository('b');

      const threads = await repository.findThreads(20);

      expect(threads).toHaveLength(20);
    });

    test('should return threads list with length 5', async () => {
      const repository = new Repository('b');

      const threads = await repository.findThreads(10, 45);

      expect(threads).toHaveLength(5);
    });
  });

  describe('countThreads', () => {
    test('should return threads count equals 50', async () => {
      const repository = new Repository('b');

      const count = await repository.countThreads();

      expect(count).toBe(50);
    });
  });

  describe('findThread', () => {
    test('should return one thread', async () => {
      const repository = new Repository('b');

      const thread = await repository.findThread(5);

      expect(thread).not.toBeNull();
    });
  });

  // describe('createThread', () => {
  //   test(
  //     'should create one thread and return thread, post and attachments',
  //     async () => {
  //       const repository = new Repository('b');

  //       const fields = {
  //         title: 'Hello test!',
  //         text: 'Hello test!',
  //         is_sage: false,
  //       };
  //       const files = [
  //         {
  //           name: '5a7e3ce6c6e93.image.jpg',
  //           uuid: '4072ad2d-f80b-4a4f-9c8a-9c0a15e6f93d',
  //           type: 'image/jpeg',
  //           size: 45330,
  //         },
  //       ];

  //       const [thread, post, attachments] = await repository.createThread(
  //         fields,
  //         files,
  //         50,
  //       );

  //       expect(thread).not.toBeNull();
  //       expect(post).not.toBeNull();
  //       expect(attachments).not.toHaveLength(0);
  //     },
  //   );
  // });
});
