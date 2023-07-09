const { evaluateRegex } = require('./utils');

class Person {
  constructor([
    name,
    nacionality,
    maritalStatus,
    document,
    street,
    number,
    neighborhood,
    state,
  ]) {
    const firstLetter = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);
    const formatFirstLetter = (prop) => (
      prop.replace(firstLetter, (_match, p1, p2) => (
        `${p1.toUpperCase()}${p2.toLowerCase()}`
      ))
    );

    this.name = name;
    this.nacionality = formatFirstLetter(nacionality);
    this.maritalStatus = formatFirstLetter(maritalStatus);
    this.document = document.replace(evaluateRegex(/\D/g), '');
    this.street = street.match(evaluateRegex(/(?<=\sa\s).*$/)).join('');
    this.number = number;
    this.neighborhood = neighborhood.match(evaluateRegex(/(?<=\s).*$/)).join('');
    this.state = state.replace(evaluateRegex(/\.$/), '');
  }
}

module.exports = Person;
