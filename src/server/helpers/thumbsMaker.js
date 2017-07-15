const path = require('path');
const sharp = require('sharp');
const ffmpeg = require('ffmpeg');
const Promise = require('Promise');

const uploadThumbsDir = path.join(__dirname, '../../../uploads_thumbs');

const makeImageThumb = (fullFilePath, fileName) => {
    return new Promise((resolve, reject) => {
        sharp(fullFilePath)
        .resize(150)
        .toFile(uploadThumbsDir + '/thumb_' + fileName)
        .then((err) => {
            if(err) console.log({error: err});

            resolve();
        });
    });
}

const makeVideoThumb = (fullFilePath, fileName) => {
    return new Promise((resolve, reject) => {
        ffmpeg(fullFilePath)
        .on('error', (err) => {
            console.log(err);;
        })
        .on('end', () => {
            resolve(fileName + 'thumb done');
        })
        .screenshots({
            count: 1,
            filename: 'thumb_' + fileName + '.png',
            folder: uploadThumbsDir,
            size: '240x?'
        });
    });
}

module.exports = {
    makeImageThumb: makeImageThumb,
    makeVideoThumb: makeVideoThumb,
}