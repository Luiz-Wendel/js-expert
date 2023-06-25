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

    const result = this.parseCSVToJSON(content);

    return result;
  }

  static isValid(csvString, option = DEFAULT_OPTIONS) {
    if (!csvString) {
      return {
        error: errors.messages.FILE_LENGTH_ERROR,
        valid: false,
      };
    }

    const [header, ...content] = csvString.split(/\r?\n/);

    const isHeaderValid = header === option.fields.join(',');

    if (!isHeaderValid) {
      return {
        error: errors.messages.FILE_FIELDS_ERROR,
        valid: false,
      };
    }

    if (!content.length || content.length > option.maxLines) {
      return {
        error: errors.messages.FILE_CONTENT_LENGTH_ERROR,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split(/\r?\n/);

    const header = lines.shift().split(',');

    const users = lines.map((line) => {
      const columns = line.split(',');

      const user = {};

      columns.forEach((column, index) => {
        user[header[index]] = column;
      });

      return user;
    });

    return users;
  }
}

module.exports = File;
