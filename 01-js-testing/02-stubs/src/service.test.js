const Service = require("./service");
const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  alderaan: require('./mocks/alderaan.json'),
}

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';

(async () => {
  // //! vai pra internet
  // {
  //   const service = new Service();
  //   const withoutStub = await service.makeRequest(BASE_URL_1);

  //   console.log(JSON.stringify(withoutStub));
  // }
})();
