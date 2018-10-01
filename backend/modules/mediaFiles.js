const asyncBusboy = require('async-busboy');
const fs = require('fs-extra');
const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const config = require('../config');

const parseFormData = async (request) => {
  const { files, fields } = await asyncBusboy(request);

  return { files, fields };
};

const moveFiles = async (files, board, threadId) => {
  const newFilesNames = [];

  await Promise.all(
    files.map(async (file) => {
      // TODO: add try/catch
      const { size } = await fs.stat(file.path);
      const uuid = uuidv4();
      const newFileName = `${uuid}-${file.filename}`;
      newFilesNames.push({
        name: file.filename,
        size,
        type: file.mimeType,
        uuid,
      });

      await fs.ensureDir(`${config.app.uploads.thumb}/${board}/${threadId}`);
      // TODO: maybe return Promise.all
      // TODO: maybe add size checking to not resize small images
      await sharp(file.path)
        .resize(200, 200)
        .min()
        .toFile(`${config.app.uploads.thumb}//${board}/${threadId}/${newFileName}`);

      return fs.move(
        file.path,
        `${config.app.uploads.source}/${board}/${threadId}/${newFileName}`,
      );
    }),
  );

  return newFilesNames;
};

module.exports = { parseFormData, moveFiles };
