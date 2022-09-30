const BaseRepository = require("../repository/base/baseRepository");

class CarService {
  constructor({ carsFile }) {
    this.carRepository = new BaseRepository({ file: carsFile });
  }

  getAvailableCar() {
    return {};
  }
}

module.exports = CarService;
