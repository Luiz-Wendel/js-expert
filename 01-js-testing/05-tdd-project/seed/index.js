// native
const { join } = require('path');
const { writeFile } = require('fs/promises');

// third party
const faker = require('faker');

// local
const Car = require('./../src/entities/car');
const CarCategory = require('./../src/entities/carCategory');
const Customer = require('./../src/entities/customer');

const databaseBaseFolder = join(__dirname, '../', 'database');
const ITEMS_AMOUT = 2;

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = [];
const customers = [];
for (let index = 0; index <= ITEMS_AMOUT; index += 1) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });

  carCategory.carIds.push(car.id);
  cars.push(car);

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 50 }),
  });

  customers.push(customer);
}

const write = (filename, data) => writeFile(
  join(databaseBaseFolder, filename),
  JSON.stringify(data),
);

(async () => {
  await write('carCategories.json', [carCategory]);
  await write('cars.json', cars);
  await write('customers.json', customers);
})();
