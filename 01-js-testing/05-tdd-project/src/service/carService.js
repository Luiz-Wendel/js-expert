const BaseRepository = require("./../repository/base/baseRepository");
const Tax = require('./../entities/tax');

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
}

module.exports = CarService;
