const { readFile } = require('fs/promises');

const { error } = require('./constants');
const User = require('./user');

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age'],
};

class File {
  static async csvToJson(filePath) {
    const content =  await File.getFileContent(filePath);

    const validation = File.isValid(content);

    if (!validation.valid) throw new Error(validation.error);

    const users = this.parseCSVToJSON(content);

    return users;
  }

  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString('utf8');
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...lines] = csvString.split('\n');

    const isHeaderValid = header === options.fields.join(',');
    if (!isHeaderValid) {
      return {
        valid: false,
        error: error.FILE_FIELDS_ERROR_MESSAGE,
      };
    }

    const isLengthValid = lines.length > 0 && lines.length <= options.maxLines;
    if (!isLengthValid) {
      return {
        valid: false,
        error: error.FILE_LENGTH_ERROR_MESSAGE,
      };
    }

    return { valid: true };
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split('\n');

    const firstLine = lines.shift();
    const header = firstLine.split(',');

    const users = lines.map(line => {
      const items = line.split(',');
      const user = {};

      for (const index in items) {
        user[header[index]] = items[index];
      }

      return new User(user);
    });

    return users;
  }
};

module.exports = File;
