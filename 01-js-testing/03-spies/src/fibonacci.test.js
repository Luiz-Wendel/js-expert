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
})();
