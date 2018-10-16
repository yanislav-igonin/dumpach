/* eslint no-undef: off */
const request = require('supertest');
const { seeders } = require('../../db');

describe('boards controller', () => {
  beforeAll(async () => {
    await seeders.init();
  });

  describe('/api/boards', () => {
    describe('GET', () => {
      test('should return 200 and sections list', (done) => {
        request('localhost:3000')
          .get('/api/boards')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err) => {
            if (err) throw done(err);
            done();
          });
      });
    });
  });

  describe('/api/boards/:boardId', () => {
    describe('GET', () => {
      test('should return 200 and single board', (done) => {
        request('localhost:3000')
          .get('/api/boards/b')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err) => {
            if (err) throw done(err);
            done();
          });
      });

      test('should return 404 for unknown board', (done) => {
        request('localhost:3000')
          .get('/api/boards/some_random_name')
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
