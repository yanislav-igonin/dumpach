const fs = require('fs');
const asyncBusboy = require('async-busboy');
// const formidable = require('formidable');
const config = require('../../../../config/config.js');

const parseFormData = async (req) => {
  const { boardId } = req.params;
  const { fields, files } = await asyncBusboy(req);
  const post = fields;

  post.files = await files.map((file) => {
    const newFullFileName = `${config.app.uploadDir}/${boardId}/${file.path.split('/')[2]}`;
    file.pipe(fs.createWriteStream(newFullFileName));
    return file.filename;
  });
  
  return post;
};

module.exports = {
  parseFormData,
};
