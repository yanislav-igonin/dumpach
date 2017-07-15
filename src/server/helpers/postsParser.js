const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const formidable = require('formidable');

const thumbsMaker = require('./thumbsMaker');

const uploadDir = path.join(__dirname, '../../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log('Uploads dir created');
}

const parsePost = (req) => {
    return new Promise((resolve, reject) => {
        let post = {
            text: '',
            files: []
        },  fullFilePath, fileName;

        let form = new formidable.IncomingForm();

        form.multiples = true;

        form.uploadDir = uploadDir;

        form.on('file', (field, file) => {
            fullFilePath = file.path + '.' + file.type.split('/')[1];
            fileName = fullFilePath.split('/')[fullFilePath.split('/').length - 1];
            fs.rename(file.path, fullFilePath);
    
            if(file.type.split('/')[0] === 'image'){
                thumbsMaker
                .makeImageThumb(fullFilePath, fileName)
                .then(() => {});
            } else {
                thumbsMaker
                .makeVideoThumb(fullFilePath, fileName)
                .then(() => {});
            }

            console.log('File', file.name, 'uploded');
            post.files.push(fileName);
        });

        form.on('field', (name, value) => {
            post[name] = value;
        });
        
        form.on('error', (err) => {
            console.log('An error has occured: \n' + err);
        });
        form.on('end', () => {

        });

        form.parse(req);
    })
}