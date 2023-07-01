/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable no-unused-expressions */

const { join } = require('path');

const {
  describe,
  it,
  before,
  beforeEach,
  afterEach,
} = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

// services
const CarService = require('../../src/service/carService');

const carsDatabase = join(__dirname, '../../database', 'cars.json');

const mocks = {
  validCar: require('../mocks/cars/valid-car.json'),
  validCarCategory: require('../mocks/carCategories/valid-carCategory.json'),
  validCustomer: require('../mocks/customers/valid-customer.json'),
};

describe('CarService Suite Tests', () => {
  let sandbox = {};
  let carService = {};

  before(() => {
    carService = new CarService({
      cars: carsDatabase,
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
    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lessThanOrEqual(data.length).and.be.greaterThanOrEqual(0);
  });

  it('should choose the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name,
    ).returns(carIdIndex);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  it('should return an available car given a car category', async () => {
    const car = mocks.validCar;
    const carCategory = { ...mocks.validCarCategory };
    carCategory.carIds = [car.id];

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name,
    ).resolves(car);

    const result = await carService.getAveilableCar(carCategory);

    const expected = car;

    expect(carService.carRepository.find.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });
});
