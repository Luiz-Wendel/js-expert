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

// entities
const Transaction = require('../../src/entities/transaction');

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

  it('should calculate the final amount in real given a car category, customer and number of days', async () => {
    const customer = {
      ...mocks.validCustomer,
      age: 50,
    };
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
    };
    const numberOfDays = 5;

    sandbox.stub(
      carService,
      'taxesBasedOnAge',
    ).get(() => [{ from: 31, to: 100, then: 1.3 }]);

    const expected = carService.currencyFormat.format(244.4);
    const result = await carService.getFinalPrice(customer, carCategory, numberOfDays);

    expect(result).to.be.deep.equal(expected);
  });

  it('should return a transaction receipt given a customer and a car category', async () => {
    const car = mocks.validCar;
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id],
    };

    const customer = {
      ...mocks.validCustomer,
      age: 20,
    };

    const numberOfDays = 5;
    const dueDate = '10 de novembro de 2020';

    const now = new Date(2020, 10, 5);
    sandbox.useFakeTimers(now.getTime());

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name,
    ).resolves(car);

    const expectedAmount = carService.currencyFormat.format(206.8);
    const result = await carService.rent(customer, carCategory, numberOfDays);
    const expected = new Transaction({
      customer,
      car,
      amount: expectedAmount,
      dueDate,
    });

    expect(result).to.be.deep.equal(expected);
  });
});
