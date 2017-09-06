const Promise = require('bluebird');

const getThreads = async (db) => {
  const threadsWithPosts = [];
  const threads = await db.any(
    'SELECT * FROM b_threads ORDER BY updated_at DESC'
  );

  await Promise.map(threads, async (thread) => {
    const posts = await db.any(
      `SELECT * FROM b_posts WHERE b_posts.thread_id=$1 ORDER BY created_at ASC`,
      [thread.id]
    );

    await Promise.map(posts, async (post) => {
      post.files = await db.any(
        `SELECT * FROM b_files WHERE b_files.post_id=$1`,
        [post.id]
      );
    });

    if (posts.length > 2) {
      thread.posts = [
        posts[0],
        posts[posts.length - 2],
        posts[posts.length - 1],
      ];
    } else if (posts.length > 1) {
      thread.posts = [posts[0], posts[posts.length - 1]];
    } else {
      thread.posts = [];
      thread.posts[0] = posts[0];
    }

    thread.all_posts = posts.length;

    threadsWithPosts.push(thread);
  });

  return threads;
};

const getThread = async (db, threadId) => {
  const thread = await db.one('SELECT * FROM b_threads WHERE id = $1', [
    threadId,
  ]);
  thread.posts = await db.any(
    'SELECT * FROM b_posts WHERE thread_id = $1 ORDER BY created_at ASC',
    [threadId]
  );

  await Promise.map(thread.posts, async (post) => {
    post.files = await db.any(
      `SELECT * FROM b_files WHERE b_files.post_id=$1`,
      [post.id]
    );
  });

  return thread;
};

const createThread = async (db, post) => {
  const threads = await db.any(
    'SELECT * FROM b_threads ORDER BY updated_at DESC'
  );

  if (threads.length > 49) {
    await deleteOldThreads(db);
  } else {
    console.log('threads: ', threads.length);
  }

  const thread = await db.one(
    'INSERT INTO b_threads DEFAULT VALUES RETURNING id'
  );

  const postId = await db.one(
    'INSERT INTO b_posts(thread_id, title, text) VALUES($1, $2, $3) RETURNING id',
    [thread.id, post.title, post.text]
  );

  await post.files.forEach(async (file) => {
    await db.query('INSERT INTO b_files(post_id, name) VALUES($1, $2)', [
      postId.id,
      file,
    ]);
  });

  return thread.id;
};

const answerInThread = async (db, threadId, post) => {
  const posts = await db.any(
    'SELECT * FROM b_posts WHERE thread_id = $1 ORDER BY created_at ASC',
    [threadId]
  );

  if (post.sage === 'false' && posts.length < 500) {
    await db.query('UPDATE b_threads SET updated_at=DEFAULT WHERE id=$1', [
      threadId,
    ]);
  }

  const postId = await db.one(
    'INSERT INTO b_posts(thread_id, title, text, sage) VALUES($1, $2, $3, $4) RETURNING id',
    [threadId, post.title, post.text, post.sage]
  );

  await post.files.forEach(async (file) => {
    await db.query('INSERT INTO b_files(post_id, name) VALUES($1, $2)', [
      postId.id,
      file,
    ]);
  });

  return await getThread(db, threadId);
};

const deleteOldThreads = async (db) => {
  await db.query(
    'DELETE FROM b_threads WHERE id=(SELECT id FROM b_threads ORDER BY updated_at ASC LIMIT 1)'
  );
};

module.exports = {
  getThreads,
  getThread,
  createThread,
  answerInThread,
};
