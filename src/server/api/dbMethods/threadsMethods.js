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

const createThread = (db, data) => {
    let _thread = {
        _id: 0,
        posts: []
    };

    return new Promise((resolve, reject) => {
        countersMethods
        .incrementNumeration('threads')
        .then((id) => {
            _thread._id = id;


            // db
            // .collection('threads')
            // .insert(thread)
        })
        // db
        // .collection('threads')
    });
}

module.exports = {
    getAllThreads: getAllThreads,
    createThread: createThread,
};

const threads = [
    {
        _id: 0,
        time: Date.now()
    }
]