const Promise = require('bluebird');
const assert = require('assert');

const countersMethods = require('./countersMethods');

const getPostsByThreadId = (db) => {
    return new Promise((resolve, reject) => {
        // db
        // .collection('posts')
        // .find({})
        // // .sort({time: -1})
        // .toArray((err, posts) => {
        //     assert.equal(null, err);
            
        //     resolve(posts);
        // });

        resolve(threads);
    });
}

module.exports = {
    getAllThreads: getAllThreads
};

const posts = [
    {
        _id: 0,
        threadId: 0,
        time: Date.now(),
        text: 'Suka',
        files: []
    },
    {
        _id: 1,
        threadId: 0,
        time: Date.now(),
        text: '123141',
        files: []
    },
    {
        _id: 2,
        threadId: 0,
        time: Date.now(),
        text: 'ccsdcwdw',
        files: []
    },
]