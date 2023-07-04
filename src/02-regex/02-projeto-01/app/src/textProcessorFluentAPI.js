const { evaluateRegex } = require('./utils');

class TextProcessorFluentAPI {
  // private property
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
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

    this.#content = onlyPerson;

    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/);

    this.#content = this.#content.map((line) => line.split(splitRegex));

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
