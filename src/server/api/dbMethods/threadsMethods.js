const Promise = require('bluebird');
const assert = require('assert');

const countersMethods = require('./countersMethods');

const getAllThreads = (db) => {
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

const threads = [
    {
        _id: 0,
        time: Date.now(),
        posts: []
    }
]