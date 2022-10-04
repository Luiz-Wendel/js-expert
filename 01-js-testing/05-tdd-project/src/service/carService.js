const BaseRepository = require("./../repository/base/baseRepository");
const Tax = require('./../entities/tax');
const Transaction = require("../entities/transaction");

class CarService {
  constructor({ carsFile }) {
    this.carRepository = new BaseRepository({ file: carsFile });

    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });

    this.taxesBasedOnAge = Tax.taxesBasedOnAge;
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;

    return Math.floor(Math.random() * listLength);
  }

  getRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);

    return carCategory.carIds[randomCarIndex];
  }

  async getAvailableCar(carCategory) {
    const carId = this.getRandomCar(carCategory);
    const car = await this.carRepository.find(carId);

    return car;
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const price = carCategory.price;
    const { value: tax } = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to);

    const finalPrice = ((tax * price) * (numberOfDays));
    const formattedPrice = this.currencyFormat.format(finalPrice);

    return formattedPrice;
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory);
    const finalPrice = this.calculateFinalPrice(customer, carCategory, numberOfDays);

    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const dueDate = today.toLocaleDateString('pt-br', options);

    const transaction = new Transaction({
      customer,
      dueDate,
      car,
      amount: finalPrice,
    });

    return transaction;
  }
}

module.exports = CarService;
