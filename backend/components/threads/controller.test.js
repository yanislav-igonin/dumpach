/* eslint no-undef: off */
const request = require('supertest');
const { seeders } = require('../../db');

// TODO: add create and update thread tests

describe('threads controller', () => {
  beforeAll(async () => {
    await seeders.init();
  });

  describe('/api/boards/:boardId/threads', () => {
    describe('GET', () => {
      test('should return 200 and threads list', (done) => {
        request('localhost:3000')
          .get('/api/boards/b/threads')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err) => {
            if (err) throw done(err);
            done();
          });
      });

      test('should return 404 for unknown board', (done) => {
        request('localhost:3000')
          .get('/api/boards/some_random_name/threads')
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err) => {
            if (err) throw done(err);
            done();
          });
      });
    });
  });

  describe('/api/boards/:boardId/threads/:threadId', () => {
    describe('GET', () => {
      test('should return 200 and single thread', (done) => {
        request('localhost:3000')
          .get('/api/boards/b/threads/10')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err) => {
            if (err) throw done(err);
            done();
          });
      });

      test('should return 404 for unknown board', (done) => {
        request('localhost:3000')
          .get('/api/boards/some_random_name/threads/10')
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err) => {
            if (err) throw done(err);
            done();
          });
      });

      test('should return 404 for unknown thread', (done) => {
        request('localhost:3000')
          .get('/api/boards/b/threads/-1')
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err) => {
            if (err) throw done(err);
            done();
          });
      });
    });
  });
});
