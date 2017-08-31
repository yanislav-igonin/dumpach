const getThreads = db => db.any('SELECT * FROM b_threads', [true]);
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
