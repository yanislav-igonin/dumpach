"use strict";

import Promise from 'bluebird';
import mongoose from 'mongoose';

////////////////////////////////////////////
////////////MONGO SCHEMA CREATION///////////
////////////////////////////////////////////

let postsNumerationSchema = mongoose.Schema({
    postsNumeration: Number
});


let PostsNumerationCollection = mongoose.model('PostsNumeration', postsNumerationSchema);


PostsNumerationCollection.createFirstDocument = () => {
    let _newNumeration = new PostsNumerationCollection({
        postNumeration: 1
    }); 

    PostsNumerationCollection.findOne({}).lean().exec((err, docs) => {
        if(docs === null){
            _newNumeration.save((err, doc) => {
                console.log('New posts numeration started');
            });
        } else {
            console.log('Old posts numeration continued');
        }
    });
}

PostsNumerationCollection.incrementPostsNumeration = () => {
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
