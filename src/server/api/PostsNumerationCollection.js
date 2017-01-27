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


// PostsNumerationCollection


module.exports = PostsNumerationCollection;
