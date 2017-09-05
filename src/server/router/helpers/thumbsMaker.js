const sharp = require('sharp');

const makeImageThumb = async (fullFilePath, fileName) => {
  debugger
  await sharp(`${fullFilePath}/${fileName}`)
    .resize(200)
    .toFile(`${fullFilePath}/thumbs/${fileName}`);

}

module.exports = {
  makeImageThumb,
};
