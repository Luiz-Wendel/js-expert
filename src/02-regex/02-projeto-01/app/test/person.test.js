const { describe, it } = require('mocha');
const { expect } = require('chai');

const Person = require('../src/person');

describe('Person', () => {
  it('should generate a person instance from properties list', () => {
    const content = [
      'Xuxa da Silva',
      'brasileira',
      'casada',
      'CPF 235.743.420-12',
      'residente e domiciliada a Rua dos bobos',
      'zero',
      'bairro Alphaville',
      'São Paulo.',
    ];

    const result = new Person(content);
    const expected = {
      name: 'Xuxa da Silva',
      nacionality: 'Brasileira',
      maritalStatus: 'Casada',
      document: '23574342012',
      street: 'Rua dos bobos',
      number: 'zero',
      neighborhood: 'Alphaville',
      state: 'São Paulo',
    };

    expect(result).to.be.deep.equal(expected);
  });

  it('should throw an error if the content is not an array', () => {
    const content = 'Xuxa da Silva';

    expect(() => new Person(content)).to.throw('Content must be an array');
  });

  it('should throw an error if the content does not contain all informations', () => {
    const content = [];

    expect(() => new Person(content)).to.throw('Content must contain all informations');
  });

  it('should throw an error if has an invalid street', () => {
    const content = [
      'Xuxa da Silva',
      'brasileira',
      'casada',
      'CPF 235.743.420-12',
      'residente e domiciliada em Rua dos bobos',
      'zero',
      'bairro Alphaville',
      'São Paulo.',
    ];

    expect(() => new Person(content)).to.throw('Invalid street');
  });

  it('should throw an error if has an invalid neighborhood', () => {
    const content = [
      'Xuxa da Silva',
      'brasileira',
      'casada',
      'CPF 235.743.420-12',
      'residente e domiciliada a Rua dos bobos',
      'zero',
      'Alphaville',
      'São Paulo.',
    ];

    expect(() => new Person(content)).to.throw('Invalid neighborhood');
  });
});
