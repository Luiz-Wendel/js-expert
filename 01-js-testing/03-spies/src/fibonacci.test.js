const sinon = require('sinon');
const assert = require('assert');

const Fibonacci = require("./fibonacci");

(async () => {
  {
    const EXECUTIONS = 3;

    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    // generators return iterators
    // there is 3 forms to read the data
    // using the functions: .next, for (await) and rest/spread

    for (const _index of fibonacci.execute(EXECUTIONS)) {};

    const expectedCallCount = EXECUTIONS + 1;

    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }
  {
    const EXECUTIONS = 5;

    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    const [...result] = fibonacci.execute(EXECUTIONS);
    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 1
    // [2] input = 3, current = 1, next = 2
    // [3] input = 2, current = 2, next = 3
    // [4] input = 1, current = 3, next = 5
    // [5] input = 0 -> STOPS

    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    assert.deepStrictEqual(args, expectedParams);
    assert.deepStrictEqual(result, expectedResult);
  }
})();
