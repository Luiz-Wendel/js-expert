/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */

import chalk from 'chalk';

import TableComponent from '../../shared/base/tableComponent.mjs';

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const columns = this.prepareData(data);
    console.log(columns);
  }

  prepareData(data) {
    const [firtsItem] = data;
    const headers = Object.keys(firtsItem);

    const formatHeader = (item, index) => (
      index % 2 === 0
        ? chalk.yellow(item)
        : chalk.green(item)
    );

    const columns = headers.map((item, index) => ({
      field: item,
      name: formatHeader(item, index),
    }));

    return columns;
  }
}
