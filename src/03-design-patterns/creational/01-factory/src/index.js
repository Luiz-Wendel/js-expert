const UserFactory = require('./factory/userFactory');

(async () => {
  const userService = await UserFactory.createInstance();

  const users = await userService.find({ name: 'John*' });

  console.log(users);
})();
