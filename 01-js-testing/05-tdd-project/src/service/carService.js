const BaseRepository = require("../repository/base/baseRepository");

class CarService {
  constructor({ carsFile }) {
    this.carRepository = new BaseRepository({ file: carsFile });
  }

  test() {
    return this.carRepository.find();
  }
}

module.exports = CarService;
