import express from 'express';
import path from 'path';
import formidable from 'formidable';
import fs from 'fs';
import Promise from 'bluebird';
import sharp from 'sharp';

import ThreadsCollection from './../api/ThreadsCollection';

const router = express.Router(),
    uploadDir = path.join(__dirname, '../../../uploads'),
    uploadThumbsDir = path.join(__dirname, '../../../uploads_thumbs');

router.get('/threads', (req, res) => {
    ThreadsCollection.getAllThreads().then((threads) => {
        res.send(threads);
    });
});

router.post('/threads', (req, res) => {

    let _thread = {
        posts: []
    },  _post = {
        title: '',
        text: '',
        files: []
    },  _fullFilePath, _fileName;

    res.setHeader('Access-Control-Allow-Origin', '*');

    var form = new formidable.IncomingForm();

    form.multiples = true;

    form.uploadDir = uploadDir;

    form.on('file', (field, file) => {
        _fullFilePath = file.path + '.' + file.type.split('/')[1];
        _fileName = _fullFilePath.split('/')[_fullFilePath.split('/').length - 1];
        fs.rename(file.path, _fullFilePath);
        
        if(file.type.split('/')[0] === 'image'){
            sharp(_fullFilePath)
                .resize(150)
                .toFile(uploadThumbsDir + '/thumb_' + _fileName, (err) => {
                    if(err) console.log({error: err});
                });
        }

        console.log('File', file.name, 'uploded');
        _post.files.push(_fileName);
    });

    form.on('field', (name, value) => {
        _post[name] = value;
    });
    
    form.on('error', (err) => {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', () => {
        _thread.posts.push(_post);

        ThreadsCollection.createNewThread(_thread).then((thread) => {
            if(thread.posts !== undefined){
                res.send(JSON.stringify(thread.threadId));
            } else {
                res.send({error: 'Thread creating error!'});
            }
        });

    });

    form.parse(req);
});

router.get('/threads/:threadId', (req, res) => {

    ThreadsCollection.getThreadById(req.params.threadId).then((thread) => {
        if(thread !== null){
            if(thread.error === undefined){
                res.send(thread);
            } else {
                res.send(thread.error);;
            }
        }
    });
});

router.post('/threads/:threadId', (req, res) => {

    let _post = {
        title: '',
        text: '',
        files: []
    },  _fullFilePath, _fileName;

    res.setHeader('Access-Control-Allow-Origin', '*');

    var form = new formidable.IncomingForm();

    form.multiples = true;

    form.uploadDir = uploadDir;

    form.on('file', (field, file) => {
        _fullFilePath = file.path + '.' + file.type.split('/')[1];
        _fileName = _fullFilePath.split('/')[_fullFilePath.split('/').length - 1];
        fs.rename(file.path, _fullFilePath);

        if(file.type.split('/')[0] === 'image'){
            sharp(_fullFilePath)
                .resize(150)
                .toFile(uploadThumbsDir + '/thumb_' + _fileName, (err) => {
                    if(err) console.log({error: err});
                });
        }

        console.log('File', file.name, 'uploded');
        _post.files.push(_fileName);
    });

    form.on('field', (name, value) => {
        _post[name] = value;
    });
    
    form.on('error', (err) => {
        console.log('An error has occured: \n' + err);
    });
    form.on('end', () => {

        ThreadsCollection.postInThread(req.params.threadId, _post).then((posts) => {
            if(posts.error !== null){
                res.send(posts);
            } else {
                res.send(posts.error);
            }
        });

    });

    form.parse(req);
});

module.exports = router;