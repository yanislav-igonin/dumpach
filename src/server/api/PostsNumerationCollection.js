"use strict";

import Promise from 'bluebird';
import mongoose from 'mongoose';

////////////////////////////////////////////
////////////MONGO SCHEMA CREATION///////////
////////////////////////////////////////////

let postsNumerationSchema = mongoose.Schema({
    postNumeration: Number
});


let PostsNumerationCollection = mongoose.model('posts_numeration', postsNumerationSchema);


PostsNumerationCollection.createFirstDocument = () => {
    let _newNumeration = new PostsNumerationCollection({
        postNumeration: 1
    }); 

    PostsNumerationCollection.findOne({}).lean().exec((err, doc) => {
        if(doc === null){
            _newNumeration.save((err, doc) => {
                console.log('New posts numeration started');
            });
        } else {
            console.log('Old posts numeration continued');
        }
    });
}

PostsNumerationCollection.incrementPostsNumeration = () => {
    console.log('incrementPostsNumeration');
    return new Promise((resolve, reject) => {

        PostsNumerationCollection.findOneAndUpdate({}, {$inc: {postNumeration: 1}}, function (err, doc) {
            if(err){
                console.log(err);
                reject();
            }

            resolve(doc.postNumeration);
        });

    })
}


module.exports = PostsNumerationCollection;
