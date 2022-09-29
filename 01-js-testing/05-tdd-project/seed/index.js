// native
const { join } = require('path');
const { writeFile } = require('fs/promises');

// third party
const faker = require('faker');

// local
const CarCategory = require('./../src/entities/carCategory');

const databaseBaseFolder = join(__dirname, '../', 'database');

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const write = (filename, data) => writeFile(
  join(databaseBaseFolder, filename),
  JSON.stringify(data),
);

(async () => {
  await write('carCategories.json', [carCategory]);
})();
