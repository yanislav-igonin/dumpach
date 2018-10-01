const asyncBusboy = require('async-busboy');
const fs = require('fs-extra');
const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const config = require('../config');

const parseFormData = async (request) => {
  const { files, fields } = await asyncBusboy(request);

  return { files, fields };
};

const createThumb = (options) => {
  const {
    path, boardIdentifier, threadId, outputFileName,
  } = options;

  return sharp(path)
    .resize(200, 200)
    .withoutEnlargement()
    .min()
    .toFile(
      `${config.app.uploads.thumb}/${boardIdentifier}/${threadId}/${outputFileName}`,
    );
};

const copyFile = (options) => {
  const {
    path, boardIdentifier, threadId, outputFileName,
  } = options;

  return fs.copy(
    path,
    `${config.app.uploads.source}/${boardIdentifier}/${threadId}/${outputFileName}`,
  );
};

const moveFiles = async (files, boardIdentifier, threadId) => {
  const newFilesNames = [];

  await Promise.all(
    files.map(async (file) => {
      try {
        const { size } = await fs.stat(file.path);
        const uuid = uuidv4();
        const newFileName = `${uuid}-${file.filename}`;
        newFilesNames.push({
          name: file.filename,
          size,
          type: file.mimeType,
          uuid,
        });

        await fs.ensureDir(
          `${config.app.uploads.thumb}/${boardIdentifier}/${threadId}`,
        );

        const imageProcessOptions = {
          path: file.path,
          boardIdentifier,
          threadId,
          outputFileName: newFileName,
        };

        await Promise.all([
          createThumb(imageProcessOptions),
          copyFile(imageProcessOptions),
        ]);

        return fs.unlink(file.path);
      } catch (err) {
        throw err;
      }
    }),
  );

  return newFilesNames;
};

module.exports = { parseFormData, moveFiles };
