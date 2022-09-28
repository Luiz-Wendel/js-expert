const sinon = require('sinon');
const assert = require('assert');

const Fibonacci = require("./fibonacci");

(async () => {
  {
    const EXECUTIONS = 3;

    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    fibonacci.execute(EXECUTIONS);

    const expectedCallCount = EXECUTIONS + 1;

    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }
})();
