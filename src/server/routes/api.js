import express from 'express';
import path from 'path';
import formidable from 'formidable';
import fs from 'fs';

import {makeImageThumb, makeVideoThumb} from '../helpers/thumbsMaker';

import ThreadsCollection from './../api/ThreadsCollection';

const router = express.Router(),
    uploadDir = path.join(__dirname, '../../../uploads');

router.get('/threads', (req, res) => {
    ThreadsCollection
    .getAllThreads()
    .then((threads) => {
        res.send(threads);
    });
});

router.post('/threads', (req, res) => {

    let _thread = {
        threadTitle: '',
        posts: []
    },  _post = {
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
            makeImageThumb(_fullFilePath, _fileName)
            .then(() => {});
        } else {
            makeVideoThumb(_fullFilePath, _fileName)
            .then(() => {});
        }

        console.log('File', file.name, 'uploded');
        _post.files.push(_fileName);
    });

    form.on('field', (name, value) => {
        switch(name){
            case 'threadTitle':
                _thread.threadTitle = value;
                break;
            case 'text':
                _post.text = value;
                break;
        }
    });
    
    form.on('error', (err) => {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', () => {
        _thread.posts.push(_post);

        ThreadsCollection
        .createNewThread(_thread)
        .then((thread) => {
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

    ThreadsCollection
    .getThreadById(req.params.threadId)
    .then((thread) => {
        if(thread !== null){
            res.send(thread);
        } else {
            res.send({error: 404});
        }
    });
});

router.post('/threads/:threadId', (req, res) => {

    let _post = {
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
            makeImageThumb(_fullFilePath, _fileName)
            .then(() => {});
        } else {
            makeVideoThumb(_fullFilePath, _fileName)
            .then(() => {});
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
        ThreadsCollection
        .postInThread(req.params.threadId, _post)
        .then((posts) => {
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