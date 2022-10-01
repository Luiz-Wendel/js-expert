const { join } = require('path');

const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const CarService = require ('./../../src/service/carService');
const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json'),
}

const carsFile = join(__dirname, './../../database', 'cars.json');

describe('CarService Suite Tests', () => {
  let carService = {};
  let sandbox = {};

  before(() => {
    carService = new CarService({
      carsFile,
    });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4];
    const result  = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lessThanOrEqual(data.length).and.be.greaterThanOrEqual(0);
  });

  it('should get the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name,
    ).returns(carIdIndex);

    const result = carService.getRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.true;
    expect(result).to.be.equal(expected);
  });

  // it('should return an available car given a carCategory', async () => {
  //   const car = mocks.validCar;
  //   const carCategory = Object.create(mocks.validCarCategory);
  //   carCategory.ids = [car.id];

  //   const result = await carService.getAvailableCar();
  //   const expected = car;

  //   expect(result).to.be.deep.equal(expected);
  // });
});
