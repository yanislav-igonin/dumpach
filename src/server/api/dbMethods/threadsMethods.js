const Promise = require('bluebird');
const assert = require('assert');

const countersMethods = require('./countersMethods');
const postsMethods = require('./postsMethods');

const getAllThreads = (db) => {
    let _threads = [];

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
                _threads.sort((a, b) => {
                    return b.time - a.time;
                });//
                
                resolve(_threads);
            });
        });
    });
}

const getAllThreadsPreview = (db) => {
    let _threads = [];

    return new Promise((resolve, reject) => {
        db
        .collection('threads')
        .find({})
        .sort({time: -1})
        .toArray((err, threads) => {
            assert.equal(null, err);

            Promise.all(
                threads
                .map((thread, threadIndex) => {
                    return new Promise((resolve, reject) => {
                        postsMethods
                        .getPreviewPostsByThreadId(db, thread.postsId)
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
                _threads.sort((a, b) => {
                    return b.time - a.time;
                });
                
                resolve(_threads);
            });
        });
    });
}

const getThreadById = (db, threadId) => {
    return new Promise((resolve, reject) => {
        db
        .collection('threads')
        .findOne({_id: parseInt(threadId)}, (err, thread) => {
            assert.equal(null, err);
            
            postsMethods
            .getPostsByThreadId(db, thread._id)
            .then((posts) => {
                thread.posts = posts;

                resolve(thread);
            })
        });
    });
}

const createThread = (db, threadTitle, postData) => {
    let _thread = {
        title: threadTitle,
        time: Date.now(),
        postsId: []
    };

    return new Promise((resolve, reject) => {
        countersMethods
        .incrementNumeration(db, 'threads')
        .then((id) => {
            _thread._id = id;

            postsMethods
            .createPost(db, postData, id)
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

const answerInThread = (db, threadId, post) => {
    let _thread;

    return new Promise((resolve, reject) => {
        postsMethods
        .createPost(db, post, parseInt(threadId))
        .then((post) => {
            db
            .collection('threads')
            .findOneAndUpdate(
                { _id: parseInt(threadId) },
                { $push: { postsId: post._id }, $set: {time: Date.now()} },
                {
                    returnOriginal: false
                }
            , (err, result) => {
                assert.equal(null, err);
                
                _thread = result.value;
                
                postsMethods
                .getPostsByThreadId(db, parseInt(threadId))
                .then((posts) => {
                    _thread.posts = posts;

                    resolve(_thread);
                });
            });
        });
    });
}

module.exports = {
    getAllThreads: getAllThreads,
    getAllThreadsPreview: getAllThreadsPreview,
    getThreadById: getThreadById,
    createThread: createThread,
    answerInThread: answerInThread,
};