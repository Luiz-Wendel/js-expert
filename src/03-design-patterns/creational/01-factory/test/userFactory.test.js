/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

const rewiremock = require('rewiremock/node');
const {
  describe,
  it,
  beforeEach,
  afterEach,
} = require('mocha');
const { expect } = require('chai');

// <could be on another file>
const dbData = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
class MockDatabase {
  connect = async () => this;

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  find = async (query) => dbData;
}
// </could be on another file>

rewiremock(() => require('../src/util/database')).with(MockDatabase);

describe('#UserFactory', () => {
  beforeEach(() => {
    rewiremock.enable();
  });

  afterEach(() => {
    rewiremock.disable();
  });

  it('should return a list of users', async () => {
    const expected = [{ name: 'JOHN DOE' }, { name: 'JANE DOE' }];

    const UserFactory = require('../src/factory/userFactory');

    const userFactory = await UserFactory.createInstance();

    const result = await userFactory.find();

    expect(result).to.be.deep.equal(expected);
  });
});
