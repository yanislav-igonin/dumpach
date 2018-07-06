const asyncBusboy = require('async-busboy');
const fs = require('fs-extra');
const uuidv4 = require('uuid/v4');
const config = require('../config');

const parseFormData = async (request) => {
  const { files, fields } = await asyncBusboy(request);

  const newFilesNames = [];

  await Promise.all(
    files.map((file) => {
      const newFileName = `${uuidv4()}-${file.filename}`;
      newFilesNames.push(newFileName);
      return fs.move(file.path, `${config.app.uploads}/${newFileName}`);
    }),
  );

  return { files: newFilesNames, fields };
};

module.exports = parseFormData;
