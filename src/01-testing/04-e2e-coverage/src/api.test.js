/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

const {
  describe,
  it,
  before,
  after,
} = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

describe('API suite test', () => {
  let app;

  before((done) => {
    app = require('./api');
    app.once('listening', done);
  });

  after((done) => {
    app.close(done);
  });

  describe('/contact', () => {
    it('should return contact us page', async () => {
      const response = await supertest(app)
        .get('/contact')
        .expect(200);

      assert.strictEqual(response.text, 'contact us page');
    });
  });
});
