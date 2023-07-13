/* eslint-disable import/extensions */

import NotImplementedException from '../notImplementedException.mjs';

export default class TableComponent {
  render() {
    throw new NotImplementedException(this.render.name);
  }
}
