/* eslint-disable import/no-extraneous-dependencies */

const safeRegex = require('safe-regex');

class InvalidRegexError extends Error {
  constructor(expression) {
    super(`This expression (${expression}) is unsafe`);
    this.name = 'InvalidRegexError';
  }
}

const evaluateRegex = (expression) => {
  if (!safeRegex(expression)) throw new InvalidRegexError(expression);

  return expression;
};

module.exports = {
  evaluateRegex,
  InvalidRegexError,
};
