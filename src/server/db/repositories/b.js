const Promise = require('bluebird');
const fs = require('fs');
const config = require('../../config/config');

const getThreads = async (db) => {
  try {
    const threadsWithPosts = [];
    const threads = await db.any('SELECT * FROM b_threads ORDER BY updated_at DESC');

    await Promise.map(threads, async (thread) => {
      const posts = await db.any(
        `SELECT * FROM b_posts WHERE b_posts.thread_id=$1 ORDER BY created_at ASC`,
        [thread.id]
      );
  
      await Promise.map(posts, async (post) => {
        post.files = await db.any(`SELECT * FROM b_files WHERE b_files.post_id=$1`, [
          post.id,
        ]);
      });
  
      if (posts.length > 2) {
        thread.posts = [posts[0], posts[posts.length - 2], posts[posts.length - 1]];
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
  } catch (e) {
    return new Error(e.message);
  }
};

const getThread = async (db, threadId) => {
  try {
    const thread = await db.one('SELECT * FROM b_threads WHERE id = $1', [threadId]);
    thread.posts = await db.any(
      'SELECT * FROM b_posts WHERE thread_id = $1 ORDER BY created_at ASC',
      [threadId]
    );
  
    await Promise.map(thread.posts, async (post) => {
      post.files = await db.any(`SELECT * FROM b_files WHERE b_files.post_id=$1`, [
        post.id,
      ]);
    });
  
    return thread;
  } catch (e) {
    return new Error(e.message);
  }
};

const createThread = async (db, post) => {
  try {
    const thread = await db.one('INSERT INTO b_threads DEFAULT VALUES RETURNING id');
  
    const threads = await db.any('SELECT * FROM b_threads ORDER BY updated_at DESC');
  
    if (threads.length > 49) {
      await deleteOldThreads(db, thread.id);
    } else {
      console.log('threads: ', threads.length);
    }
  
    const postId = await db.one(
      'INSERT INTO b_posts(thread_id, title, text) VALUES($1, $2, $3) RETURNING id',
      [thread.id, post.title, post.text]
    );
  
    await post.files.forEach(async (file) => {
      await db.query(
        'INSERT INTO b_files(thread_id, post_id, name) VALUES($1, $2, $3)',
        [thread.id, postId.id, file]
      );
    });
  
    return thread.id;
  } catch (e) {
    return new Error(e.message);
  }
};

const answerInThread = async (db, threadId, post) => {
  try {
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
      'INSERT INTO b_posts(thread_id, title, text, sage) ' +
        'VALUES($1, $2, $3, $4) ' +
        'RETURNING id',
      [threadId, post.title, post.text, post.sage]
    );
  
    await post.files.forEach(async (file) => {
      await db.query(
        'INSERT INTO b_files(thread_id, post_id, name) VALUES($1, $2, $3)',
        [threadId, postId.id, file]
      );
    });
  
    return await getThread(db, threadId);
  } catch (e) {
    return new Error(e.message);
  }
};

const deleteOldThreads = async (db) => {
  try {
    const thread = await db.one(
      'SELECT id FROM b_threads ORDER BY updated_at ASC LIMIT 1'
    );

    const files = await db.query(
      'SELECT name from b_files WHERE b_files.thread_id=$1',
      [thread.id]
    );
    
    files.forEach(async (file) => {
      fs.unlink(
        `${config.app.uploadDir}/b/${file.name}`,
        (err) => console.log(`${file.name} deleted`)
      );
      fs.unlink(
        `${config.app.uploadDir}/b/thumbs/${file.name}`,
        (err) => console.log(`${file.name} thumb deleted`)
      );
    });

    db.query('DELETE FROM b_threads WHERE id=$1', [thread.id]);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getThreads,
  getThread,
  createThread,
  answerInThread,
};
