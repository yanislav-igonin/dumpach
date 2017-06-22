const Promise = require('bluebird');
const assert = require('assert');

const initNumeration = (db, counterId) => {
    return new Promise((resolve, reject) => {
        db
        .collection('counters')
        .find({_id: counterId})
        .toArray((err, result) => {
            if(result.length === 0){
                db
                .collection('counters')
                .insert({_id: counterId, seq: 0}, (err, result) => {
                    assert.equal(null, err);

                    console.log(counterId, 'numeration initialized');

                    resolve();
                });
            } else {
                console.log(counterId, 'numeration continued');

                resolve();
            }
        })
    });
}

const incrementNumeration = (db, counterId) => {
    return new Promise((resolve, reject) => {
        db
        .collection('counters')
        .findAndModify(
            { _id: counterId },
            {},
            { $inc: { seq: 1 } }
        , (err, result) => {
            assert.equal(null, err);
            resolve(result.value.seq);
        });

    });
}

module.exports = {
    initNumeration: initNumeration,
    incrementNumeration: incrementNumeration
};