const assert = require('assert');

const { errors } = require('./src/constants');
const File = require('./src/file');

(async () => {
  const invalidTestCases = [
    {
      filePath: './mocks/invalid-emptyContent.csv',
      expected: new Error(errors.messages.FILE_LENGTH_ERROR),
    },
    {
      filePath: './mocks/invalid-header.csv',
      expected: new Error(errors.messages.FILE_FIELDS_ERROR),
    },
    {
      filePath: './mocks/invalid-fiveItems.csv',
      expected: new Error(errors.messages.FILE_LENGTH_ERROR),
    },
  ];

  invalidTestCases.forEach(async (testCase) => {
    const result = File.csvToJson(testCase.filePath);

    await assert.rejects(result, testCase.expected);
  });

  const validTestCases = [
    {
      filePath: './mocks/valid-threeItems.csv',
      expected: [
        {
          id: 1,
          name: 'Jane Doe',
          profession: 'developer',
          age: 40,
        },
        {
          id: 2,
          name: 'Jhon Doe',
          profession: 'manager',
          age: 40,
        },
      ],
    },
  ];

  validTestCases.forEach(async (testCase) => {
    const result = await File.csvToJson(testCase.filePath);

    assert.deepEqual(result, testCase.expected);
  });
})();
