const assert = require('assert');

const { errors } = require('./src/constants');
const File = require('./src/file');

(async () => {
  const rejectTestCases = [
    {
      filePath: './mocks/invalid-emptyFile.csv',
      expected: new Error(errors.messages.FILE_LENGTH_ERROR),
    },
  ];

  rejectTestCases.forEach(async (testCase) => {
    const result = File.csvToJson(testCase.filePath);

    await assert.rejects(result, testCase.expected);
  });
})();
