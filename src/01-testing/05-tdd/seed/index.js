/* eslint-disable import/no-extraneous-dependencies */

const faker = require('faker');
const { join } = require('path');
const { writeFile } = require('fs/promises');

// entities
const Car = require('../src/entities/car');
const CarCategory = require('../src/entities/carCategory');
const Customer = require('../src/entities/customer');

// constants
const SEEDER_BASE_FOLDER = join(__dirname, '../', 'database');
const AMOUNT = 3;

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const createFakeCar = () => new Car({
  id: faker.random.uuid(),
  name: faker.vehicle.model(),
  releaseYear: faker.date.past().getFullYear(),
  available: true,
  gasAvailable: true,
});

const createFakeCustomer = () => new Customer({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  age: faker.random.number({ min: 18, max: 70 }),
});

const cars = [];
const customers = [];
for (let index = 0; index < AMOUNT; index += 1) {
  const car = createFakeCar();

  carCategory.carIds.push(car.id);
  cars.push(car);

  const customer = createFakeCustomer();

  customers.push(customer);
}

const write = (fileName, data) => writeFile(
  join(SEEDER_BASE_FOLDER, fileName),
  JSON.stringify(data),
);

(async () => {
  await write('cars.json', cars);
  await write('carCategories.json', [carCategory]);
  await write('customers.json', customers);
})();
