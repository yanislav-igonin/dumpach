const checkPostValidity = (fields, files) => {
  const isThereAnyFiles = files.length > 0;
  const isThereAnyFields = fields.title || fields.text;

  return isThereAnyFields || isThereAnyFiles;
};

module.exports = {
  checkPostValidity,
};
