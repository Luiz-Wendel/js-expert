/* eslint-disable import/extensions */

import NotImplementedException from '../notImplementedException.mjs';

export default class ViewFactory {
  createTable() {
    throw new NotImplementedException(this.render.name);
  }
}
