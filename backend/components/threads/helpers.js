const checkPostValidity = (fields, files) => {
  const isThereAnyFiles = files.length > 0;
  const isThereAnyText = Boolean(fields.text);

  return isThereAnyText || isThereAnyFiles;
};

module.exports = {
  checkPostValidity,
};
