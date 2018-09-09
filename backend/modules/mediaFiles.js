const asyncBusboy = require('async-busboy');
const fs = require('fs-extra');
const uuidv4 = require('uuid/v4');
const config = require('../config');

const parseFormData = async (request) => {
  const { files, fields } = await asyncBusboy(request);

  return { files, fields };
};

const moveFiles = async (files, threadId) => {
  const newFilesNames = [];

  await Promise.all(
    files.map((file) => {
      const newFileName = `${uuidv4()}-${file.filename}`;
      newFilesNames.push(newFileName);
      return fs.move(file.path, `${config.app.uploads}/${threadId}/${newFileName}`);
    }),
  );

  return newFilesNames;
};

module.exports = { parseFormData, moveFiles };
