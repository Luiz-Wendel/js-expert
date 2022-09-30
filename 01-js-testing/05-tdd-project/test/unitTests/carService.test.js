const { join } = require('path');
const assert = require('assert');

const { describe, it, before } = require('mocha');
const { expect } = require('chai');

const CarService = require ('./../../src/service/carService');
const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json'),
}

const carsFile = join(__dirname, './../../database', 'cars.json');

describe('CarService Suite Tests', () => {
  let carService = {};

  before(() => {
    carService = new CarService({
      carsFile,
    });
  });

  it('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4];
    const result  = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lessThanOrEqual(data.length).and.be.greaterThanOrEqual(0);
  });

  it('should return an available car given a carCategory', async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.ids = [car.id];

    const result = await carService.getAvailableCar();
    const expected = car;

    expect(result).to.be.deep.equal(expected);
  });
});
