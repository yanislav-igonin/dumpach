const Promise = require('bluebird');
const assert = require('assert');

const countersMethods = require('./countersMethods');

const getPostsByThreadId = (db, threadId) => {
    return new Promise((resolve, reject) => {
        db
        .collection('posts')
        .find({threadId: threadId})
        .toArray((err, posts) => {
            assert.equal(null, err);
            
            resolve(posts);
        });
    });
}

const createPost = (db, post) => {
    return new Promise((resolve, reject) => {
        countersMethods
        .incrementNumeration('posts')
        .then((id) => {
            post._id = id;

            db
            .collection('posts')
            .insert(post, (err, result) => {
                assert.equal(null, err);

                resolve()
            });
        });
    });
}

module.exports = {
    getPostsByThreadId: getPostsByThreadId
};

// const posts = [
//     {
//         _id: 0,
//         threadId: 0,
//         time: Date.now(),
//         text: 'Suka',
//         files: []
//     },
//     {
//         _id: 1,
//         threadId: 0,
//         time: Date.now(),
//         text: '123141',
//         files: []
//     },
//     {
//         _id: 2,
//         threadId: 0,
//         time: Date.now(),
//         text: 'ccsdcwdw',
//         files: []
//     },
// ]