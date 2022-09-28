const { rejects, deepStrictEqual } = require('assert');

const File = require('./src/file');
const { error } = require('./src/constants');

(async() => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/header-invalid.csv';
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    Date.prototype.getFullYear = () => 2020;

    const filePath = './mocks/threeItems-valid.csv';
    const expected = [
      {
        "id": 123,
        "name": "Erick Wendel",
        "profession": "JavaScript Instructor",
        "birthYear": 1995
      },
      {
        "id": 321,
        "name": "John Doe",
        "profession": "JavaScript Specialist",
        "birthYear": 1940
      },
      {
        "id": 231,
        "name": "Jane Doe",
        "profession": "Java Developer",
        "birthYear": 1990
      }
    ]
    const result = await File.csvToJson(filePath);

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
