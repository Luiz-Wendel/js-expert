/* eslint-disable class-methods-use-this */

class Fibonacci {
  * execute(input, current = 0, next = 1) {
    if (input === 0) {
      return;
    }

    yield current;

    if (input >= 1) {
      yield* this.execute(input - 1, next, current + next);
    }
  }
}

module.exports = Fibonacci;
