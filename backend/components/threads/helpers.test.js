/* eslint no-undef: off */
const { checkPostValidity } = require('./helpers');

describe('checkPostValidity', () => {
  test('should return false with empty text and empty files', () => {
    const fields = {
      text: '',
    };
    const files = [];

    expect(checkPostValidity(fields, files)).toBe(false);
  });

  test('should return true with text and empty files', () => {
    const fields = {
      text: 'Hello world!',
    };
    const files = [];

    expect(checkPostValidity(fields, files)).toBe(true);
  });

  test('should return true with empty text and files', () => {
    const fields = {
      text: '',
    };
    const files = ['file1', 'file2'];

    expect(checkPostValidity(fields, files)).toBe(true);
  });
});
