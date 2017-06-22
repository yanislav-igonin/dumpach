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

            Promise
            .map(threads, (thread, threadIndex) => {
                postsMethods
                .getPostsByThreadId(db, thread._id)
                .then((posts) => {
                    thread.posts = posts;
                    _threads.push(thread);
                })
            })
            .then(() => {
                resolve(threads);
            })
            
        });
    });
}

module.exports = {
    getAllThreads: getAllThreads
};

const threads = [
    {
        _id: 0,
        time: Date.now()
    }
]