/* eslint-disable no-unused-expressions */

const { describe, it } = require('mocha');
const { expect } = require('chai');

const { evaluateRegex, InvalidRegexError } = require('../src/utils');

describe('Util', () => {
  it('#evaluateRegex should throw an error if the expression is unsafe', () => {
    const unsafeRegex = /^([a-zA-Z0-9]+\s?)+$/;

    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This expression (${unsafeRegex}) is unsafe`);
  });

  it('#evaluateRegex should return the expression if it is safe', () => {
    const safeRegex = /^([a-z])$/;

    expect(() => evaluateRegex(safeRegex)).to.not.throw();
    expect(evaluateRegex(safeRegex)).to.be.ok;
  });
});
