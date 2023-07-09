// utils
const { evaluateRegex } = require('./utils');

// entities
const Person = require('./person');

class TextProcessorFluentAPI {
  // private property
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    if (!this.#content) throw new Error('The content cannot be empty');

    // ?<= -> lookbehind (extract everything that is after the pattern)
    // [contratante|contratada] -> find the words 'contratante' or 'contratada'
    // :\s{1} -> find the character ':' followed by a space
    // All of above in a group to get the following content (lookbehind)

    // (?!\\s) -> negative lookahead (ignore following space)

    // .*\n -> anything followed by a line break
    // .*? -> anything (lazy) (? non greety, stop on the first match)
    // $ -> end of line

    // gmi -> global, multiline, case insensitive

    const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi);

    // match -> return an array with the matches
    const onlyPerson = this.#content.match(matchPerson);

    if (!onlyPerson) throw new Error('Could not find a person with the pattern');

    this.#content = onlyPerson;

    return this;
  }

  divideTextInColumns() {
    if (!Array.isArray(this.#content)) throw new Error('The content should be an array');

    const splitRegex = evaluateRegex(/,/);

    this.#content = this.#content.map((line) => line.split(splitRegex));

    return this;
  }

  trimContent() {
    const trimRegex = evaluateRegex(/^\s+|\s+$|\n/g);

    this.#content = this.#content.map((line) => line.map((item) => item.replace(trimRegex, '')));

    return this;
  }

  mapPerson() {
    this.#content = this.#content.map((line) => new Person(line));

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
