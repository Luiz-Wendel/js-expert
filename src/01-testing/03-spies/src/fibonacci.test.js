/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */

const assert = require('assert');
const { createSandbox } = require('sinon');

const Fibonacci = require('./fibonacci');

const sinon = createSandbox();
const fibonacci = new Fibonacci();

(async () => {
  const testCases = [
    {
      input: 0,
      expectedParams: [0],
      expectedResult: [],
    },
    {
      input: 1,
      expectedParams: [0, 1, 1],
      expectedResult: [0],
    },
    {
      input: 2,
      expectedParams: [0, 1, 2],
      expectedResult: [0, 1],
    },
    {
      input: 3,
      expectedParams: [0, 2, 3],
      expectedResult: [0, 1, 1],
    },
    {
      input: 4,
      expectedParams: [0, 3, 5],
      expectedResult: [0, 1, 1, 2],
    },
    {
      input: 5,
      expectedParams: [0, 5, 8],
      expectedResult: [0, 1, 1, 2, 3],
    },
  ];

  const spy = sinon.spy(fibonacci, fibonacci.execute.name);

  testCases.forEach((testCase) => {
    spy.resetHistory();

    const result = [...fibonacci.execute(testCase.input)];

    assert.deepStrictEqual(result, testCase.expectedResult);

    assert.strictEqual(spy.callCount, testCase.input + 1);

    const { args } = spy.getCall(testCase.input);
    assert.deepStrictEqual(args, testCase.expectedParams);
  });
})();
