/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

const { createSandbox } = require('sinon');
const assert = require('assert');

const Service = require('./service');

const mocks = {
  tatooine: require('../mocks/tatooine.json'),
  alderaan: require('../mocks/alderaan.json'),
};

const sinon = createSandbox();

const BASE_URL = 'https://swapi.dev/api';
const PLANET_ENDPOINT = (planetNumber) => `${BASE_URL}/planets/${planetNumber}/`;
const URLS = {
  tatooine: PLANET_ENDPOINT(1),
  alderaan: PLANET_ENDPOINT(2),
};
const PLANETS = ['tatooine', 'alderaan'];

(async () => {
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  PLANETS.forEach((planet) => {
    stub.withArgs(URLS[planet]).resolves(mocks[planet]);
  });

  {
    const testCases = [
      {
        expected: {
          name: 'Tatooine',
          surfaceWater: '1',
          appearedIn: 5,
        },
        url: URLS.tatooine,
      },
      {
        expected: {
          name: 'Alderaan',
          surfaceWater: '40',
          appearedIn: 2,
        },
        url: URLS.alderaan,
      },
    ];

    testCases.forEach(async ({ expected, url }) => {
      const result = await service.getPlanets(url);

      assert.deepEqual(result, expected);
    });
  }
})();
