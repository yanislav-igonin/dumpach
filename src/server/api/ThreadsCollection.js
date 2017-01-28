"use strict";

import Promise from 'bluebird';


////////////////////////////////////////////
///////////DB CONNECTION FUNCTIONS//////////
////////////////////////////////////////////

import mongoose from 'mongoose';
const db_url = 'mongodb://localhost/dumpach';

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
    posts: Array,
	updateTime: Number
});


let ThreadsCollection = mongoose.model('Threads', threadsSchema);



////////////////////////////////////////////
//////////MONGO COLLECTION METHODS//////////
////////////////////////////////////////////

ThreadsCollection.getAllThreads = () => {
    console.log('getAllThreads');

    return new Promise((resolve, reject) => {
		ThreadsCollection.find({}, {posts: {$slice: 1}}).lean().exec((err, threads) => {
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
		posts: thread.posts,
		updateTime: Date.now()
	});

	return new Promise((resolve, reject) => {

		_newThread.save((err, thread) => {
			if (err) {
				console.error('Create new thread error', err);
				resolve(err);
			} else {
				deleteOldThread();
				resolve(thread);
			}
		})

	});
}

ThreadsCollection.postInThread = (threadId, post) => {

	console.log('postInThread', threadId, post);

	let _postsLength, _updateParameters;
	
	if(post.sage === 'true'){
		post.sage = true;
	} else {
		post.sage = false;
	}

	return new Promise((resolve, reject) => {
		if (threadId.match(/^[0-9a-fA-F]{24}$/)) {

			ThreadsCollection.findById(threadId).lean().exec((err, thread) => {

				_postsLength = thread.posts.length;
				_updateParameters = getThreadUpdateTimeParameters(post, _postsLength, thread);

				ThreadsCollection.findByIdAndUpdate(
					threadId,
					{$push: { "posts": post }, $set: _updateParameters},
					{safe: true, upsert: true, new: true},
					(err, thread) => {
						if (err) {
							console.error('Get thread by id error', err);
							resolve(err);
						} else {
							resolve(thread.posts);
						}
					}
				);
			
			});

		} else {
			resolve(null);
		}
	});
}

function getThreadUpdateTimeParameters(post, postsLength, thread){
	let _parameters = {updateTime: post.time};
	
	if(post.sage === true || postsLength > 500){
		_parameters.updateTime = thread.updateTime;
	}
	
	return _parameters;
}

function deleteOldThread(){
	ThreadsCollection.find({}).lean().exec((err, threads) => {

		if(threads.length > 50){
			ThreadsCollection.findOne().sort({updateTime: 1}).exec((err, thread) => {

				ThreadsCollection.remove({ _id: thread._id }, function(err) {
					if (err) {
						console.log('error:', err);
					}
				});

			});
		}
	});
}

////////////////////////////////////////////
/////////////MONGO MODEL EXPORT/////////////
////////////////////////////////////////////

module.exports = ThreadsCollection;
