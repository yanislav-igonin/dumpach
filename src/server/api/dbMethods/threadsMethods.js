const Promise = require('bluebird');
const assert = require('assert');

const countersMethods = require('./countersMethods');
const postsMethods = require('./postsMethods');

const getAllThreads = (db) => {
    let _threads = [],
        _thread;

    return new Promise((resolve, reject) => {
        db
        .collection('threads')
        .find({})
        .toArray((err, threads) => {
            assert.equal(null, err);

            Promise.all(
                threads
                .map((thread, threadIndex) => {
                    return new Promise((resolve, reject) => {
                        postsMethods
                        .getPostsByThreadId(db, thread._id)
                        .then((posts) => {
                            resolve(posts);
                        })
                    })
                    .then((posts) => {
                        thread.posts = posts;
                        _threads.push(thread);
                    })
                })
            )
            .then(() => {
                resolve(_threads);
            })
            
        });
    });
}

getThreadById = (db, threadId) => {
    return new Promise((resolve, reject) => {
        db
        .collection('threads')
        .findOne({_id: parseInt(threadId)}, (err, thread) => {
            assert.equal(null, err);

            console.log(thread);
            postsMethods
            .getPostsByThreadId(db, thread._id)
            .then((posts) => {
                thread.posts = posts;

                resolve(thread);
            })
        });
    });
}

const createThread = (db, data) => {
    let _thread = {
        title: data.thread.title,
        time: Date.now(),
        postsId: []
    };

    return new Promise((resolve, reject) => {
        countersMethods
        .incrementNumeration(db, 'threads')
        .then((id) => {
            _thread._id = id;
            data.post.threadId = id

            postsMethods
            .createPost(db, data.post)
            .then((post) => {
                _thread.postsId.push(post._id);

                db
                .collection('threads')
                .insert(_thread ,(err, result) => {
                    _thread.posts = [];
                    _thread.posts.push(post);

                    resolve(_thread);
                });


            });
        });
    });
}

module.exports = {
    getAllThreads: getAllThreads,
    getThreadById: getThreadById,
    createThread: createThread,
};