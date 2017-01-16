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
				console.error('Get threads error', err);
				resolve(err);
			} else {
				resolve(threads);
			}
		});
	});
}

ThreadsCollection.getThreadById = (threadId) => {
    console.log('getThreadById');

    return new Promise((resolve, reject) => {
		if (threadId.match(/^[0-9a-fA-F]{24}$/)) {
			ThreadsCollection.findById(threadId).lean().exec((err, thread) => {
				if (err) {
					console.error('Get thread by id error', err);
					resolve(err);
				} else {
					resolve(thread);
				}
			});
		} else {
			resolve(null);
		}
	});
}

ThreadsCollection.createNewThread = (thread) => {
	console.log('createNewThread');

	let _newThread = new ThreadsCollection({
		posts: thread.posts
	});

	return new Promise((resolve, reject) => {

		_newThread.save((err, thread) => {
			if (err) {
				console.error('Create new thread error', err);
				resolve(err);
			} else {
				resolve(thread);
			}
		})

	});
}

ThreadsCollection.postInThread = (threadId, post) => {

	console.log('postInThread', threadId, post);

	return new Promise((resolve, reject) => {
		if (threadId.match(/^[0-9a-fA-F]{24}$/)) {

			ThreadsCollection.findByIdAndUpdate(
				threadId,
				{$push: { "posts": post }},
				{safe: true, upsert: true, new: true},
				(err, thread) => {
					if (err) {
						console.error('Get thread by id error', err);
						resolve(err);
					} else {
						console.log(thread);
						resolve(thread.posts);
					}
				}
			);

		} else {
			resolve(null);
		}
	});
}

////////////////////////////////////////////
/////////////MONGO MODEL EXPORT/////////////
////////////////////////////////////////////

module.exports = ThreadsCollection;
