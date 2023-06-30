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

  describe('/login', () => {
    it('should login successfully on the system', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({
          username: 'Test',
          password: '123456',
        })
        .expect(200);

      assert.strictEqual(response.text, 'ok');
    });

    it('should fail to login on the system with invalid password', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({
          username: 'Test',
          password: '123',
        })
        .expect(401);

      assert.strictEqual(response.text, 'invalid credentials');
    });

    it('should fail to login on the system with invalid username', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({
          username: 'testing',
          password: '123456',
        })
        .expect(401);

      assert.strictEqual(response.text, 'invalid credentials');
    });

    it('should fail to login on the system with invalid username and password', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({
          username: 'testing',
          password: '123',
        })
        .expect(401);

      assert.strictEqual(response.text, 'invalid credentials');
    });

    it('should fail to login on the system with empty body', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({})
        .expect(400);

      assert.strictEqual(response.text, 'invalid data');
    });

    it('should fail to login on the system without password', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({
          username: 'test',
        })
        .expect(400);

      assert.strictEqual(response.text, 'invalid data');
    });

    it('should fail to login on the system without username', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({
          password: '123456',
        })
        .expect(400);

      assert.strictEqual(response.text, 'invalid data');
    });
  });
});
