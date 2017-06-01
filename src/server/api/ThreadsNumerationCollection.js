"use strict";

import Promise from 'bluebird';
import mongoose from 'mongoose';

////////////////////////////////////////////
////////////MONGO SCHEMA CREATION///////////
////////////////////////////////////////////

let threadsNumerationSchema = mongoose.Schema({
    threadsNumeration: Number
});


let ThreadsNumerationCollection = mongoose.model('threads_numeration', threadsNumerationSchema);


ThreadsNumerationCollection.createFirstDocument = () => {
    let _newNumeration = new ThreadsNumerationCollection({
        threadsNumeration: 1
    }); 

    ThreadsNumerationCollection.findOne({}).lean().exec((err, doc) => {
        if(doc === null){
            _newNumeration.save((err, doc) => {
                console.log('New threads numeration started');
            });
        } else {
            console.log('Old threads numeration continued');
        }
    });
}

ThreadsNumerationCollection.incrementThreadsNumeration = () => {
    console.log('incrementThreadsNumeration');
    return new Promise((resolve, reject) => {

        ThreadsNumerationCollection.findOneAndUpdate({}, {$inc: {threadsNumeration: 1}}, function (err, doc) {
            if(err){
                console.log(err);
                reject();
            }

            resolve(doc.threadsNumeration);
        });

    })
}


module.exports = ThreadsNumerationCollection;
