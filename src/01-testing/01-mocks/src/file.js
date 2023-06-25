const { readFile } = require('fs/promises');
const { errors } = require('./constants');

class File {
  static async csvToJson(filePath) {
    const content = await readFile(filePath, { encoding: 'utf-8' });

    const validation = this.isValid(content);

    if (!validation.valid) throw new Error(validation.error);
  }

  static isValid(csvString) {
    const [, ...content] = csvString.split(/\r?\n/);

    if (!content.length) {
      return {
        error: errors.messages.FILE_LENGTH_ERROR,
        valid: false,
      };
    }

    return false;
  }
}

module.exports = File;
