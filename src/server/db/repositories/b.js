const Promise = require('bluebird');

const getThreads = db =>
  new Promise((resolve, reject) => {
    const threadWithPosts = [];
    db.any('SELECT * FROM b_threads', [true]).then((threads) => {
      threads.forEach((thread) => {
        Promise.all(
          db.any(`SELECT * FROM b_posts WHERE "threadId" = ${thread.id}`, [
            true,
          ])
        ).then((posts) => {
          thread.posts = posts;
          console.log(thread);
          threadWithPosts.push(thread);
          resolve(threadWithPosts);
        });
      });
    });
  });

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
