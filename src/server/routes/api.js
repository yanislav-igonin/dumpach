import express from 'express';
import path from 'path';
import formidable from 'formidable';
import fs from 'fs';
import Promise from 'bluebird';

import ThreadsCollection from './../api/ThreadsCollection';

const router = express.Router(),
    uploadDir = path.join(__dirname, '../../../uploads');

// const threads = [
//     {
//         posts: [
//             {
//                 text: 'sdfksldfmskldfskldfsdf',
//                 title: 'sdfsdfsdfsdsnuihf34y734yf73f93hf3',
//                 files: []
//             }
//         ]
//     },
//     {
//         posts: [
//             {
//                 text: '123123',
//                 title: 'sdfsdf',
//                 files: []
//             }
//         ]
//     },
// ]

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
                res.status(201).send(thread._id);
            } else {
                res.send({error: 'Thread creating error!'});
            }
        });

    });

    form.parse(req, function(err, fields, files) {
        console.log(err);
        console.log(fields);
        console.log(files);
    });
});

router.get('/threads/:threadId', (req, res) => {

    ThreadsCollection.getThreadById(req.params.threadId).then((thread) => {
        if(thread.error !== null){
            res.send(thread);
        } else {
            res.res.send(thread.error);;
        }
    });
});

router.post('/threads/:threadId', (req, res) => {

    let _post = {
        title: '',
        text: '',
        files: []
    },  _fullFilePath, _fileName;



        console.log(req);

    res.setHeader('Access-Control-Allow-Origin', '*');

    var form = new formidable.IncomingForm();

    form.multiples = true;

    form.uploadDir = uploadDir;

    form.on('file', (field, file) => {
        _fullFilePath = file.path + '.' + file.type.split('/')[1];
        _fileName = _fullFilePath.split('/')[_fullFilePath.split('/').length - 1];
        fs.rename(file.path, _fullFilePath);
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
            if(posts !== undefined){
                res.status(201).send(posts);
            } else {
                res.send('Ошибка при ответе в тред!');
            }
        })

    });

    form.parse(req);
});

router.use((req, res, next) => {
    res.send('Not found');
});

module.exports = router;