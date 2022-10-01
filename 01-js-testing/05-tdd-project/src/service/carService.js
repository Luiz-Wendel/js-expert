const BaseRepository = require("../repository/base/baseRepository");

class CarService {
  constructor({ carsFile }) {
    this.carRepository = new BaseRepository({ file: carsFile });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;

    return Math.floor(Math.random() * listLength);
  }

  getRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);

    return carCategory.carIds[randomCarIndex];
  }

  getAvailableCar() {
    return {};
  }
}

module.exports = CarService;
