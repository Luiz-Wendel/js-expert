class TextProcessorFluentAPI {
  // private property
  #content;

  constructor(content) {
    this.#content = content;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
