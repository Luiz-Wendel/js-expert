/* eslint-disable import/extensions */

import ViewFactory from '../../shared/base/viewFactory.mjs';
import TableBrowserComponent from './table.mjs';

export default class BrowserFactory extends ViewFactory {
  // eslint-disable-next-line class-methods-use-this
  createTable() {
    return new TableBrowserComponent();
  }
}
