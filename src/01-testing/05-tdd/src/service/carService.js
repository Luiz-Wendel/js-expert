/* eslint-disable class-methods-use-this */

// repositories
const BaseRepository = require('../repository/base/baseRepository');

// entities
const Tax = require('../entities/tax');

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });

    this.taxesBasedOnAge = Tax.taxesBasedOnAge;
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;

    return Math.floor(Math.random() * listLength);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomCarIndex];

    return carId;
  }

  async getAveilableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);

    return car;
  }

  getFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const { price } = carCategory;
    const getTaxBasedOnAge = (tax) => age >= tax.from && age <= tax.to;
    const { then: tax } = this.taxesBasedOnAge
      .find(getTaxBasedOnAge);

    const finalPrice = (tax * price) * numberOfDays;
    const formattedPrice = this.currencyFormat.format(finalPrice);

    return formattedPrice;
  }
}

module.exports = CarService;
