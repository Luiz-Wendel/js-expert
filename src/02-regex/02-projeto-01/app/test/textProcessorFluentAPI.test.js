const { describe, it } = require('mocha');
const { expect } = require('chai');

const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI');

const mock = require('./mock/valid');

describe('TextProcessorFluentAPI', () => {
  it('#build', () => {
    const result = new TextProcessorFluentAPI(mock)
      .build();

    expect(result).to.be.equal(mock);
  });
});
