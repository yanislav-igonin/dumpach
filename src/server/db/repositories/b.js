const Promise = require('bluebird');

const getThreads = async (db) => {
  const threadsWithPosts = [];
  const threads = await db.any('SELECT * FROM b_threads');
  
  await Promise.map(threads, async (thread) => {
    thread.posts = await db.any(
      `SELECT * FROM b_posts WHERE b_posts."threadId"=${thread.id}`
    );
    threadsWithPosts.push(thread);
  });
  
  return threads;
};

const createThread = (db, req) =>
  db.one('INSERT INTO b_threads DEFAULT VALUES RETURNING id');
// db.any(
//   'INSERT INTO b_threads DEFAULT VALUES;' +
//     `INSERT INTO b_posts (title, text) VALUES (${req.body.title}, ${req.body
//       .text});`,
//   [true]
// );
// return 'dick';

module.exports = {
  getThreads,
  createThread,
};
