const { join } = require('path');

const { describe, it, before } = require('mocha');

const CarService = require ('./../../src/service/carService');

const carsFile = join(__dirname, './../../database', 'cars.json');

describe('CarService Suite Tests', () => {
  let carService = {};

  before(() => {
    carService = new CarService({
      carsFile,
    });
  });

  it('should return an available car given a carCategory', async () => {
    const result = await carService.test();

    console.log('result', result);
  });
});
