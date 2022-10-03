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

  it('should return an available car given a carCategory', async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name,
    ).resolves(car);

    sandbox.spy(
      carService,
      carService.getRandomCar.name,
    )

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;

    expect(carService.getRandomCar.calledOnce).to.be.true;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.true;
    expect(result).to.be.deep.equal(expected);
  });

  it('should calculate final amount in real given a carCategory, customer and numberOfDays', async () => {
    const customer = Object.create(mocks.validCustomer);
    customer.age = 50;

    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.price = 37.6

    const numberOfDays = 5;

    // age: 50 -> 1.3 tax
    // categoryPrice -> 37.6
    // 37.6 * 1.3 = 48.88 * 5 = 244.40

    sandbox.stub(
      carService,
      'taxesBasedOnAge',
    ).get(() => [{ from: 40, to: 50, value: 1.3 }]);

    const result = carService.calculateFinalPrice(customer, carCategory, numberOfDays);
    const expected = carService.currencyFormat.format(244.40);

    expect(result).to.be.deep.equal(expected);
  });
});
