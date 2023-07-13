/* eslint-disable import/extensions */

import ViewFactory from '../../shared/base/viewFactory.mjs';
import TableConsoleComponent from './table.mjs';

export default class ConsoleFactory extends ViewFactory {
  // eslint-disable-next-line class-methods-use-this
  createTable() {
    return new TableConsoleComponent();
  }
}
