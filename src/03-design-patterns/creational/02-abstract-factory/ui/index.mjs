/* eslint-disable import/extensions */

import { database } from '../shared/data.mjs';

// could be done in another file
class Application {
  constructor(factory) {
    this.table = factory.createTable();
  }

  // eslint-disable-next-line no-shadow
  initialize(database) {
    this.table.render(database);
  }
}
// #could be done in another file

(
  async function main() {
    const path = globalThis.window ? 'browser' : 'console';
    const { default: ViewFactory } = await import(`./../platforms/${path}/index.mjs`);
    const app = new Application(new ViewFactory());

    app.initialize(database);
  }()
);
