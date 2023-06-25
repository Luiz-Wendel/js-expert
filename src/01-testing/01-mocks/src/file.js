const { readFile } = require('fs/promises');
const { errors } = require('./constants');

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age'],
};

class File {
  static async csvToJson(filePath) {
    const content = await readFile(filePath, { encoding: 'utf-8' });

    const validation = this.isValid(content);

    if (!validation.valid) throw new Error(validation.error);
  }

  static isValid(csvString, option = DEFAULT_OPTIONS) {
    const [header, ...content] = csvString.split(/\r?\n/);

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
