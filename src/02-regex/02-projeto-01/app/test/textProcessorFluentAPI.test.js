/* eslint-disable global-require */

const { describe, it } = require('mocha');
const { expect } = require('chai');

const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI');

const mocks = {
  valid: require('./mock/valid'),
  invalidEmptyContent: require('./mock/invalid-emptyContent'),
  invalidContent: require('./mock/invalid-content'),
};

describe('TextProcessorFluentAPI', () => {
  describe('#build', () => {
    it('should return the content', () => {
      const result = new TextProcessorFluentAPI(mocks.valid)
        .build();

      expect(result).to.be.equal(mocks.valid);
    });
  });

  describe('#extractPeopleData', () => {
    it('should correctly extract people data', () => {
      const result = new TextProcessorFluentAPI(mocks.valid)
        .extractPeopleData()
        .build();

      const expected = [
        [
          'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
          'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ',
        ].join('\n'),
        [
          'Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ',
          'domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. ',
        ].join('\n'),
        [
          'Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ',
          'domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ',
        ].join('\n'),
      ];

      expect(result).to.be.deep.equal(expected);
    });

    it('should throw an error when there is no content', () => {
      expect(
        () => new TextProcessorFluentAPI(mocks.invalidEmptyContent)
          .extractPeopleData()
          .build(),
      ).to.throw('The content cannot be empty');
    });

    it('should throw an error when there is no match', () => {
      expect(
        () => new TextProcessorFluentAPI(mocks.invalidContent)
          .extractPeopleData()
          .build(),
      ).to.throw('Could not find a person with the pattern');
    });
  });

  describe('#divideTextInColumns', () => {
    it('should correctly divide the text in columns', () => {
      const content = [
        [
          'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
          'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ',
        ].join('\n'),
      ];

      const result = new TextProcessorFluentAPI(content)
        .divideTextInColumns()
        .build();
      const expected = [
        [
          'Xuxa da Silva',
          ' brasileira',
          ' casada',
          ' CPF 235.743.420-12',
          ' residente e \ndomiciliada a Rua dos bobos',
          ' zero',
          ' bairro Alphaville',
          ' São Paulo. ',
        ],
      ];

      expect(result).to.be.deep.equal(expected);
    });

    it('should throw an error when the content is not an array', () => {
      expect(
        () => new TextProcessorFluentAPI(mocks.valid)
          .divideTextInColumns()
          .build(),
      ).to.throw('The content should be an array');
    });
  });

  describe('#trimContent', () => {
    it('should correctly trim the content', () => {
      const content = [
        [
          'Xuxa da Silva',
          ' brasileira',
          ' casada',
          ' CPF 235.743.420-12',
          ' residente e \ndomiciliada a Rua dos bobos',
          ' zero',
          ' bairro Alphaville',
          ' São Paulo. ',
        ],
      ];

      const result = new TextProcessorFluentAPI(content)
        .trimContent()
        .build();

      const expected = [
        [
          'Xuxa da Silva',
          'brasileira',
          'casada',
          'CPF 235.743.420-12',
          'residente e domiciliada a Rua dos bobos',
          'zero',
          'bairro Alphaville',
          'São Paulo.',
        ],
      ];

      expect(result).to.be.deep.equal(expected);
    });

    it('should throw an error when the content is not an array of arrays of strings', () => {
      const invalidContentTypes = [
        mocks.valid,
        [mocks.valid],
        [[{ mock: mocks.valid }]],
        [[123]],
      ];

      invalidContentTypes.forEach((invalidContent) => {
        expect(
          () => new TextProcessorFluentAPI(invalidContent)
            .trimContent()
            .build(),
        ).to.throw('The content should be an array of arrays of strings');
      });
    });
  });

  describe('#mapPerson', () => {
    it('should correctly map the person', () => {
      const content = [
        [
          'Xuxa da Silva',
          'brasileira',
          'casada',
          'CPF 235.743.420-12',
          'residente e domiciliada a Rua dos bobos',
          'zero',
          'bairro Alphaville',
          'São Paulo.',
        ],
      ];

      const result = new TextProcessorFluentAPI(content)
        .mapPerson()
        .build();
      const expected = [
        {
          name: 'Xuxa da Silva',
          nacionality: 'Brasileira',
          maritalStatus: 'Casada',
          document: '23574342012',
          street: 'Rua dos bobos',
          number: 'zero',
          neighborhood: 'Alphaville',
          state: 'São Paulo',
        },
      ];

      expect(result).to.be.deep.equal(expected);
    });

    it('should throw an error if the content is not an array', () => {
      const invalidContentTypes = [
        mocks.valid,
        123,
        { mock: mocks.valid },
      ];

      invalidContentTypes.forEach((invalidContent) => {
        expect(
          () => new TextProcessorFluentAPI(invalidContent)
            .mapPerson()
            .build(),
        ).to.throw('The content should be an array');
      });
    });

    it('should throw an error if the content is not valid', () => {
      const invalidContentTypes = [
        [mocks.valid],
        [[{ mock: mocks.valid }]],
        [[123]],
        [[
          'Xuxa da Silva',
          'brasileira',
          'casada',
          'CPF 235.743.420-12',
          'residente e domiciliada em Rua dos bobos',
          'zero',
          'bairro Alphaville',
          'São Paulo.',
        ]],
        [[
          'Xuxa da Silva',
          'brasileira',
          'casada',
          'CPF 235.743.420-12',
          'residente e domiciliada a Rua dos bobos',
          'zero',
          'Alphaville',
          'São Paulo.',
        ]],
        [[]],
      ];

      invalidContentTypes.forEach((invalidContent) => {
        expect(
          () => new TextProcessorFluentAPI(invalidContent)
            .mapPerson()
            .build(),
        ).to.throw('The content is not valid');
      });
    });
  });
});
