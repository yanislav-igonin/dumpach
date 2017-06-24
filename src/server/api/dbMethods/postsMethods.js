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

const createPost = (db, post, threaId) => {
    post.time = Date.now();
    
    return new Promise((resolve, reject) => {
        countersMethods
        .incrementNumeration(db, 'posts')
        .then((id) => {
            post._id = id;
            if(threaId !== undefined){
                post.threadId = threaId;
            }

            db
            .collection('posts')
            .insert(post, (err, result) => {
                assert.equal(null, err);

                resolve(post)
            });
        });
    });
}

const replyPost = (db, postId, replyPost) => {
    return new Promise((resolve, reject) => {
        countersMethods
        .incrementPostNumeration(db)
        .then((id) => {
            replyPost._id = id;

            db
            .collection('posts')
            .insert(replyPost, (err, result) => {
                assert.equal(null, err);

                db
                .collection('posts')
                .findOneAndUpdate(
                    { _id: parseInt(postId) },
                    { $push: { replies: id } },
                    {
                        returnOriginal: false
                    }
                , (err, result) => {
                    assert.equal(null, err);
                    
                    getAllPosts(db)
                    .then((posts) => resolve(posts));
                });
            });

        });
    });
}

module.exports = {
    getPostsByThreadId: getPostsByThreadId,
    createPost: createPost
};