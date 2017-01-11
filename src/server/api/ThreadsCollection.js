"use strict";

import Promise from 'bluebird';


////////////////////////////////////////////
///////////DB CONNECTION FUNCTIONS//////////
////////////////////////////////////////////

import mongoose from 'mongoose';
const db_url = 'localhost';

mongoose.connect(db_url);
mongoose.Promise = Promise;

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + db_url);
});

////////////////////////////////////////////
////////////MONGO SCHEMA CREATION///////////
////////////////////////////////////////////

let threadsSchema = mongoose.Schema({
    posts: Array
});


let ThreadsCollection = mongoose.model('Threads', threadsSchema);



////////////////////////////////////////////
//////////MONGO COLLECTION METHODS//////////
////////////////////////////////////////////

ThreadsCollection.getAllThreads = () => {
    console.log('getAllThreads');

    return new Promise((resolve, reject) => {
		ThreadsCollection.find({}).lean().exec((err, threads) => {
			if (err) {
				console.error('Get threads error');
				resolve(err);
			} else {
				resolve(threads);
			}
		});
	});
}



////////////////////////////////////////////
/////////////MONGO MODEL EXPORT/////////////
////////////////////////////////////////////

module.exports = PostsCollection;
